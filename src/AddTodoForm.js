import React from 'react';

function AddTodoForm({addTodo, todoTitle, setTodoTitle}) {

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
            <label htmlFor='todoTitle'>Title</label>
            <input
                type='text'
                id='todoTitle'
                name='title'
                value={todoTitle}
                onChange={handleTitleChange}
            />
            <button type='submit'>Add</button>
        </form>
    )
}

export default AddTodoForm