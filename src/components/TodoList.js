import React from 'react';
import TodoListItem from './TodoListItem';
import style from '../css_modules/TodoList.module.css'
import PropTypes from 'prop-types'

function TodoList({ todoList, onRemoveTodo, onToggleCompleted, sumTodos, setSumTodos }) {
  return (
    <ul className={style.TodoList}>
      <li className={style.ListHead}>Today</li>
      {todoList.map((task) =>
        <TodoListItem
          key={task.id}
          task={task}
          onRemoveTodo={onRemoveTodo}
          toggleCompleted={onToggleCompleted}
          setSumTodos={setSumTodos}
        />
      )}
      <li className={style.ListFoot}>{`${sumTodos} items to go`}</li>
    </ul>
  )
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onToggleCompleted: PropTypes.func
}

export default TodoList

