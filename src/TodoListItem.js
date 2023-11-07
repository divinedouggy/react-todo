import React from 'react';

function TodoListItem({ task }) {
    return (
        <li>{task.title}</li>
    )
}

export default TodoListItem