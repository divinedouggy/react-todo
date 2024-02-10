import { useEffect, useState } from 'react';
import TodoList from './TodoList'
import AddTodoForm from './AddTodoForm';
import style from '../css_modules/App.module.css'
import { Link } from 'react-router-dom';

const getSumTodos = (todoList) => {
    return todoList.reduce(
      (result, value) => value.completed? result -= 1 : result, 
      todoList.length
    )
  }

function TodoContainer({ tableName }) {
    const [todoTitle, setTodoTitle] = useState("")
    const [todoList, setTodoList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const API_TOKEN = process.env.REACT_APP_AIRTABLE_API_TOKEN
    const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID
      
    const url = `https://api.airtable.com/v0/${BASE_ID}/${tableName}/`
    // const sortParams = "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=created&sort[1][direction]=asc"
  
    const [sumTodos, setSumTodos] = useState(0)
    
    useEffect(() => {
      setSumTodos(getSumTodos(todoList))
    }, [todoList])
  
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      }
  
      try {
        const response = await fetch(`${url}`, options)
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
        
        todos.sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        })
  
        // const reverseTodos = todos.sort((a,b) => {
        //   if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
        // })
  
        setTodoList(todos)
        setIsLoading(false)
  
      } catch (error) {
        console.log(error.message)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [tableName])
  
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
  
        setTodoList([...todoList, newTodo].sort((a, b) => {
          if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
        }))
  
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
            <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                    Back
                </Link>
            </button>
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
            sumTodos={sumTodos}
            setSumTodos={setSumTodos}
            tableName={tableName}
          />}
      </div>
    );
  }

export default TodoContainer