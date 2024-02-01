import React from 'react';
import { useRef } from 'react';
import style from '../css_modules/TodoListItem.module.css'
import UnCheckedBox from '../box_wo_check.png'
import CheckedBox from '../box_w_check.png'

function TodoListItem({ task, onRemoveTodo, toggleCompleted }) {

    const checkMarkRef = useRef()
    const checkMarkHandler = () => {
        if (checkMarkRef.current.children[0].children[0].src === UnCheckedBox) {
            checkMarkRef.current.children[0].children[0].src = CheckedBox
            checkMarkRef.current.childNodes[0].style.textDecoration ="line-through"
            task.completed = true
            toggleCompleted(task)
        }
        else if (checkMarkRef.current.children[0].children[0].src === CheckedBox) {
            checkMarkRef.current.children[0].children[0].src = UnCheckedBox
            checkMarkRef.current.childNodes[0].style.textDecoration ="none"
            task.completed = false
            toggleCompleted(task)
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

export default TodoListItem