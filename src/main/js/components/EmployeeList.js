import React from 'react';
import Employee from './Employee';
import CreateDialog from './CreateDialog';

function EmployeeList({ employees, onCreate, isModalOpen, openModal, closeModal}) {
  return (
    <div>
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
      <button onClick={openModal}>Create</button>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <CreateDialog
              onCreate={onCreate}
              onClose={closeModal}
              attributes={['firstName', 'lastName', 'description']}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
