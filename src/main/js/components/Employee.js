import React from 'react';

function Employee({ employee, handleDelete }) {
  const onDelete = () => {
    handleDelete(employee._links.self.href);
  };

  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.description}</td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Employee;
