import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import employeeService from './services/employeeService';
import EmployeeList from './components/EmployeeList';

const pageSize = 10;


function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState({});
  const [links, setLinks] = useState({});

  const fetchState = async () => {
    try {
      const hal = await employeeService.loadFromServer(0, pageSize);
      setLinks(hal._links);
      setPages(hal.pages);
      setEmployees(hal._embedded.employees);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  async function onCreate(employeeData) {
    try {
      await employeeService.createEmployee(employeeData);
      await fetchState();
      closeModal();
      // go to last page
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    console.log("clicked Nav");
  }

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={
            <EmployeeList
              employees={employees}
              onCreate={onCreate}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              handleNavClick={handleNavClick}
              links={links}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
