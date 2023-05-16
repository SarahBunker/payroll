import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



import employeeService from './services/employeeService';

import EmployeeList from './components/EmployeeList';




function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const newEmployeeList = await employeeService.getEmployees();
        setEmployees(newEmployeeList);
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  async function onCreate(employeeData) {
    try {
      await employeeService.createEmployee(employeeData);
      const newEmployeeList = await employeeService.getEmployees();
      setEmployees(newEmployeeList);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };
  

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<EmployeeList employees={employees} onCreate={onCreate} toggleModal={toggleModal} isModalOpen={isModalOpen}/>} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
