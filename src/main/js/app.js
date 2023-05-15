import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import employeeService from './services/employeeService';

import EmployeeList from './components/EmployeeList';
import CreateDialog from './components/CreateDialog'; //FIXME

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
    <div className='container'>
      <EmployeeList employees={employees} />
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <CreateDialog onCreate={onCreate} onClose={toggleModal} attributes={['firstName', 'lastName', 'description']} />
          </div>
        </div>
      )}
      <button onClick={toggleModal}>Create</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
