import React from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { useState } from 'react';

const useSemiPersistentState = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList"))
  const [todoList, setTodoList] = useState(savedTodoList || [])

  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList))
  }, [todoList])

  return [todoList, setTodoList]
}

function App() {
  
  const [todoList, setTodoList] = useSemiPersistentState()
  const [todoTitle, setTodoTitle] = useState("")

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

      <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
    </>
  );
}

export default App;

