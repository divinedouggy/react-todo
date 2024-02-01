import React from 'react';
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm';
import { useState } from 'react';
import style from './css_modules/App.module.css'


function App() {
  
  const [todoTitle, setTodoTitle] = useState("")
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN
  const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID
  const TABLE_NAME = process.env.REACT_APP_TABLE_NAME

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/`
  const sortParams = "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=created&sort[1][direction]=asc"

  const fetchData = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    }

    try {
      const response = await fetch(`${url}${sortParams}`, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      const todos = data.records.map((todo) => {
        const newTodo = {
          title: todo.fields.title,
          id: todo.id,
          completed: todo.fields.completed
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
        title: todo,
        completed: false
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
        id: data.id,
        completed: data.fields.completed
      }

      setTodoList([...todoList, newTodo])

    } catch (error) {
      console.log(error.message)
      return null
    }
  }

  const updateTodo = async (todo) => {
    const airtableData = {
      fields: {
        completed: todo.completed
      }
    }

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(airtableData),
    }

    try {
      const response = await fetch(`${url}${todo.id}`, options)
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
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
    <div className={style.App}>
      <h1>My Todo List</h1>

      <AddTodoForm
        addTodo={addTodo}
        todoTitle={todoTitle}
        setTodoTitle={setTodoTitle}
      />

      {isLoading ? <p>Loading...</p> :
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onToggleCompleted={updateTodo}
        />}
    </div>
  );
}

export default App;
