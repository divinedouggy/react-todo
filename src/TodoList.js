import React from 'react';
import TodoListItem from './TodoListItem';

let todoList = [
    {
      id: 1,
      title: "Complete assignment"
    }, {
      id: 2,
      title: "Walk dogs"
    }, {
      id: 3,
      title: "Clean office"
    }]

function TodoList() {
  return (
    <ul>
      {todoList.map((task) =>
        <TodoListItem key={task.id} task={task} />
      )}
    </ul>
  )
}

export default TodoList

