import React from 'react';
import { useRef } from 'react';
import style from './css_modules/TodoListItem.module.css'
import UnCheckedBox from './box_wo_check.png'
import CheckedBox from './box_w_check.png'
import {ReactComponent as UnCheckedBoxComponent} from './box_wo_check.svg'
import {ReactComponent as CheckedBoxComponent} from './box_w_check.svg'

function TodoListItem({ task, onRemoveTodo }) {

    const checkMarkRef = useRef()
    const checkMarkHandler = () => {
        if (checkMarkRef.current.src === UnCheckedBox) {
            checkMarkRef.current.src = CheckedBox
        }
        else if (checkMarkRef.current.src === CheckedBox) {
            checkMarkRef.current.src = UnCheckedBox
        }
    }


    return (
        <li className={style.ListItem}>
            {/* {`${task.completed} `} */}
            <div>
                <img
                    ref={checkMarkRef}
                    onClick={checkMarkHandler}
                    src={UnCheckedBox}
                    className={style.CheckBox}
                />

                {/* <UnCheckedBoxComponent className={style.CheckBox} height="18px" width="18px" />
                <CheckedBoxComponent className={style.CheckBox} height="18px" width="18px" /> */}

                {task.title}
            </div>
            <button type='button' onClick={() => onRemoveTodo(task.id)}>
                Remove
            </button>
        </li>
    )
}

export default TodoListItem