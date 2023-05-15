import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
// import axios from 'axios';

import employeeService from './services/employeeService';


import EmployeeList from './components/EmployeeList';
import CreateDialog from './components/CreateDialog'; //FIXME

function App() {
  const [employees, setEmployees] = useState([]);

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
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }

  return (
    <div>
      <EmployeeList employees={employees} />
      <CreateDialog onCreate={onCreate} attributes={['firstName', 'lastName', 'description']}/>
    </div>
    
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
