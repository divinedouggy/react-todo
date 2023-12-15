import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {
  
  const [todoTitle, setTodoTitle] = useState("")
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN
  const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID
  const TABLE_NAME = process.env.REACT_APP_TABLE_NAME

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/`

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      const todos = data.records.map((todo) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id
        }
        return newTodo
      })

      setTodoList(todos)
      setIsLoading(false)

    } catch (error) {
      console.log(error.message)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const addTodo = async (todo) => {
    const airtableData = {
      fields: {
        title: todo
      }
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      const newTodo = {
        title: data.fields.title,
        id: data.id
      }
      setTodoList([...todoList, newTodo])

    } catch (error) {
      console.log(error.message)
      return null
    }
  }

  const deleteTodo = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }

    try {
      const response = await fetch(`${url}${id}`, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (todo) => todo.id !== id
    )
    setTodoList(newTodoList)
    deleteTodo(id)
  }

  return (
    <>
      <h1>Todo List</h1>

      <AddTodoForm
        addTodo={addTodo}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
      />

      {isLoading ? <p>Loading...</p> :
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  );
}

export default App;
