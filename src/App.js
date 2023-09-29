
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

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function(task) {
          return <li key={task.id}>{task.title}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
