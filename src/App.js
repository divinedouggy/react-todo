import TodoContainer from './components/TodoContainer';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import style from './css_modules/App.module.css'

const TABLE_NAME = process.env.REACT_APP_TABLE_NAME
const TABLE_NAME_2 = process.env.REACT_APP_TABLE_NAME_2

const LandingPage = () => {
  return (
    <>
      <div className={style.Landing}>

        <h1>My Todo List</h1>
        <h2>What's on the agenda?</h2>

        <div className={style.ColumnContainer}>

          <div className={style.Column1}>
            <p>Get on your grind:</p>
            <p>Reflect on your accomplishments:</p>
          </div>
          
          <div className={style.Column2}>
            <Link to="/TodoList">
              Your Todo List
            </Link>
            <Link to="/Completed">
              Your Completed Tasks
            </Link>
          </div>

        </div>

      </div>
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

const Footer = () => {
  return(
    <div className={style.Footer}>
      <p>© My Todo List</p>
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
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
