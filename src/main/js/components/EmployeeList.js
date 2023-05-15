import React from 'react';
import Employee from './Employee';

function EmployeeList({ employees }) {
  return (
    <table className="employee-table">
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Description</th>
        </tr>
        {employees.map((employee) => (
          <Employee key={employee._links.self.href} employee={employee} />
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;
