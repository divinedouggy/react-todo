import { useEffect, useRef } from "react"
import style from '../css_modules/InputWithLabel.module.css'
import PropTypes from 'prop-types'

function InputWithLabel({ todoTitle, handleTitleChange, children }) {

    const inputRef = useRef()

    useEffect(() => {
        inputRef.current.focus()
    })

    return (
        <div className={style.InputWithLabel}>
            <label className={style.Label} htmlFor='todoTitle'>{children}</label>
            <input
                className={style.Input}
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

InputWithLabel.propTypes = {
    todoTitle: PropTypes.string,
    handleTitleChange: PropTypes.func,
    children: PropTypes.string
}

export default InputWithLabel