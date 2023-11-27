import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

function App() {
  
  const [todoTitle, setTodoTitle] = useState("")

  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"))
  const [todoList, setTodoList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  React.useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() =>
        resolve({ data: { todoList: savedTodoList || [] } }),
        2000
      )
    })
      .then((result) => {
        setTodoList(result.data.todoList)
        setIsLoading(false)
      })
  }, [])

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList))
    }
  }, [todoList])

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(
      (todo) => todo.id !== id
    )
    setTodoList(newTodoList)
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

