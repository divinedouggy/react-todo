import { useRef } from 'react';

function TodoListItem({ task, onRemoveTodo }) {

    const strikeRef = useRef()


    const strikeHandler = () => {
        strikeRef.current.style.textDecoration = "line-through"
    }

    return (
        <li ref={strikeRef} >
            <button type='button' onClick={() => strikeHandler()}>
                Check
            </button>
            {task.title}
            &nbsp;
            <button type='button' onClick={() => onRemoveTodo(task.id)}>
                Remove
            </button>
        </li>
    )
}

export default TodoListItem