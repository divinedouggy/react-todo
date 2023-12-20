import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/new' element={<h1>New Todo List</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
