import React from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types'

function AddTodoForm({ addTodo, todoTitle, setTodoTitle }) {

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault()
        addTodo(todoTitle)
        setTodoTitle("")
    }

    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel
                handleTitleChange={handleTitleChange}
                todoTitle={todoTitle}
            >
                Title:
            </InputWithLabel>
        </form>
    )
}

AddTodoForm.propTypes = {
    addTodo: PropTypes.func,
    todoTitle: PropTypes.string,
    setTodoTitle: PropTypes.func
}

export default AddTodoForm