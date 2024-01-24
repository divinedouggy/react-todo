import React from 'react';
import TodoListItem from './TodoListItem';
import style from './css_modules/TodoList.module.css'

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul className={style.TodoList}>
      {todoList.map((task) =>
        <TodoListItem key={task.id} task={task} onRemoveTodo={onRemoveTodo} />
      )}
    </ul>
  )
}

export default TodoList

