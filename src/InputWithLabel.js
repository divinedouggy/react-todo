import { useEffect, useRef } from "react"

function InputWithLabel(props) {

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return(
        <div>
            <label htmlFor='todoTitle'>{props.children}</label>
            <input
                type='text'
                id='todoTitle'
                name='title'
                value={props.todoTitle}
                onChange={props.handleTitleChange}
                ref={inputRef}
            />
            <button type='submit'>Add</button>
        </div>
    )
}

export default InputWithLabel