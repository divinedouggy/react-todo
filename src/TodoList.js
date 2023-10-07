import React from 'react';

let todoList = [
    {
      id: 1,
      title: "Complete assignment"
    }, {
      id: 2,
      title: "Walk dogs"
    }, {
      id: 3,
      title: "Clean office"
    }]

function TodoList() {
    return(
        <ul>
        {todoList.map( (task) => 
         <li key={task.id}>{task.title}</li>
        )}
        </ul>
    )
}

export default TodoList

