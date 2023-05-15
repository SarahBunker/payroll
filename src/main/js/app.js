import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import EmployeeList from './components/EmployeeList';
import CreateDialog from './components/CreateDialog'; //FIXME

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const pageSize = 2; // Define your desired page size
    loadFromServer(pageSize);
  }, []);

  async function loadFromServer(pageSize) {
    try {
      const root = '/api';
      const employeesRel = 'employees';

      const response = await axios.get(`${root}/${employeesRel}`, { params: { size: pageSize } });
      const employeeCollection = response.data;
      const links = employeeCollection._links;

      const schemaResponse = await axios.get(links.profile.href, { headers: { 'Accept': 'application/schema+json' } });
      const schema = schemaResponse.data;

      setEmployees(employeeCollection._embedded.employees);
      // Other state updates (attributes, pageSize, links) can be done here as well
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  }

  function handleEmployeeCreate() { // FIXME
    window.alert("Creating employee");
  }

  return (
    <div>
      <EmployeeList employees={employees} />
      <CreateDialog onCreate={handleEmployeeCreate} attributes={['firstName', 'lastName', 'description']}/>
    </div>
    
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
