import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

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

  return (
    <EmployeeList employees={employees} />
  );
}

function EmployeeList({ employees }) {
  return (
    <table>
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Description</th>
        </tr>
        {employees.map(employee => (
          <Employee key={employee._links.self.href} employee={employee} />
        ))}
      </tbody>
    </table>
  );
}

function Employee({ employee }) {
  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.description}</td>
    </tr>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
