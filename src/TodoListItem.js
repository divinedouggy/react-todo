import React from 'react';

function TodoListItem({ task, onRemoveTodo }) {
    return (
        <li>
            {task.title}
            &nbsp;
            <button type='button' onClick={() => onRemoveTodo(task.id)}>
                Remove
            </button>
        </li>
    )
}

export default TodoListItem