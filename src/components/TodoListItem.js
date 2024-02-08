import React from 'react';
import { useRef } from 'react';
import style from '../css_modules/TodoListItem.module.css'
import UnCheckedBox from '../box_wo_check.png'
import CheckedBox from '../box_w_check.png'
import PropTypes from 'prop-types'

function TodoListItem({ task, onRemoveTodo, toggleCompleted, setSumTodos }) {

    const checkMarkRef = useRef()
    const checkMarkHandler = () => {
        if (checkMarkRef.current.children[0].children[0].src === UnCheckedBox) {
            checkMarkRef.current.children[0].children[0].src = CheckedBox
            checkMarkRef.current.childNodes[0].style.textDecoration ="line-through"
            task.completed = true
            toggleCompleted(task)
            setSumTodos((previous) => previous - 1)
        }
        else if (checkMarkRef.current.children[0].children[0].src === CheckedBox) {
            checkMarkRef.current.children[0].children[0].src = UnCheckedBox
            checkMarkRef.current.childNodes[0].style.textDecoration ="none"
            task.completed = false
            toggleCompleted(task)
            setSumTodos((previous) => previous + 1)
        }
    }


    return (
        <li
            className={task.completed
                ? `${style.ListItem} ${style.Complete}`
                : style.ListItem}
            ref={checkMarkRef}
        >
            <div onClick={checkMarkHandler}>
                <img
                    src={task.completed ? CheckedBox : UnCheckedBox}
                    className={style.CheckBox}
                />

                {task.title}
            </div>
            <button type='button' onClick={() => onRemoveTodo(task.id)}>
                Remove
            </button>
        </li>
    )
}

TodoListItem.propTypes = {
    task: PropTypes.object,
    onRemoveTodo: PropTypes.func,
    toggleCompleted: PropTypes.func
}

export default TodoListItem