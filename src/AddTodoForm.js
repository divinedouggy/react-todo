import React from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ addTodo, todoTitle, setTodoTitle }) {

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault()
        addTodo({ title: todoTitle, id: Date.now() })
        setTodoTitle("")
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                handleTitleChange={handleTitleChange}
                todoTitle={todoTitle}
            >
                Title
            </InputWithLabel>
        </form>
    )
}

export default AddTodoForm