import TodoContainer from './components/TodoContainer';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './css_modules/App.module.css'

const TABLE_NAME = process.env.REACT_APP_TABLE_NAME
const TABLE_NAME_2 = process.env.REACT_APP_TABLE_NAME_2

const LandingPage = () => {
  return (
    <>
      <div className={style.App}>
        <h1>Welcome to My Todo List</h1>
        <p>What's on the agenda?</p>


        <Link to="/TodoList">
          Your Todo List
        </Link>
        <Link to="/Completed">
          Your Completed Tasks
        </Link>
      </div>
      <p>© My Todo List</p>
    </>
  );
}

const TableChooser = () => {
  const [tableName, setTableName] = useState(TABLE_NAME)
  return(
    <div>
      <select
      id="selectField"
      value={tableName}
      onChange={(event) => setTableName(event.target.value)}
      >
        <option value={TABLE_NAME}>Monday</option>
        <option value={TABLE_NAME_2}>Tuesday</option>
      </select>
      <TodoContainer tableName={tableName}/>

    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/TodoList' element={<TableChooser />} />
        <Route
          path="/Completed"
          element={
            <>
              <button>
                <Link to="/" style={{ color: "black", textDecoration: "none" }}>
                  Back
                </Link>
              </button>
              <h1>Completed Tasks</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
