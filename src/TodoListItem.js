import React from 'react'

function TodoListItem(props) {
    return (
        <li>{props.task.title}</li>
    )
}

export default TodoListItem