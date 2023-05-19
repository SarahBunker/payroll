import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import EmployeeList from './components/EmployeeList';

function App() {  

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={
            <EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
