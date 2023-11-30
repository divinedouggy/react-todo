import { useEffect, useRef } from "react"

function InputWithLabel({ todoTitle, handleTitleChange, children }) {

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <div>
            <label htmlFor='todoTitle'>{children}</label>
            <input
                type='text'
                id='todoTitle'
                name='title'
                value={todoTitle}
                onChange={handleTitleChange}
                ref={inputRef}
            />
            <button type='submit'>Add</button>
        </div>
    )
}

export default InputWithLabel