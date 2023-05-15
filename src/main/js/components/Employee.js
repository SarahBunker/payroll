import React from 'react';

function Employee({ employee }) {
  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.description}</td>
    </tr>
  );
}

export default Employee;
