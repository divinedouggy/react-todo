import React from 'react';
import TodoListItem from './TodoListItem';
import style from '../css_modules/TodoList.module.css'
import PropTypes from 'prop-types'

function TodoList({ todoList, onRemoveTodo, onToggleCompleted }) {
  return (
    <ul className={style.TodoList}>
      {todoList.map((task) =>
        <TodoListItem
          key={task.id}
          task={task}
          onRemoveTodo={onRemoveTodo}
          toggleCompleted={onToggleCompleted}
        />
      )}
    </ul>
  )
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onToggleCompleted: PropTypes.func
}

export default TodoList

