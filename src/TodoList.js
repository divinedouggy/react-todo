import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
  return (
    <ul>
      {todoList.map((task) =>
        <TodoListItem key={task.id} task={task} />
      )}
    </ul>
  )
}

export default TodoList

