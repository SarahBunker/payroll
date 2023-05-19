import React from 'react';

function Employee({ employee, handleDelete, clickUpdate }) {
  const onDelete = () => {
    handleDelete(employee._links.self.href);
  };

  const handleClickUpdate = () => {
    clickUpdate(employee);
  }

  return (
    <tr>
      <td>{employee.firstName}</td>
      <td>{employee.lastName}</td>
      <td>{employee.description}</td>
      <td>
        <button onClick={handleClickUpdate}>Update</button>
      </td>
      <td>
        <button onClick={onDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Employee;
