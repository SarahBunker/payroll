import React from 'react';
import Employee from './Employee';
import CreateDialog from './CreateDialog';

function EmployeeList({ employees, onCreate, isModalOpen, openModal, closeModal, links, handleNavClick}) {

  const navLinks = [];
	if ("first" in links) {
		navLinks.push(<button key="first" onClick={handleNavClick}>&lt;&lt;</button>);
	}
	if ("prev" in links) {
		navLinks.push(<button key="prev" onClick={handleNavClick}>&lt;</button>);
	}
	if ("next" in links) {
		navLinks.push(<button key="next" onClick={handleNavClick}>&gt;</button>);
	}
	if ("last" in links) {
		navLinks.push(<button key="last" onClick={handleNavClick}>&gt;&gt;</button>);
	}

  return (
    <div>
      <div className='container'>
        <button onClick={openModal}>Create</button>
      </div>
      
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
      {navLinks}
    </div>
  );
}

export default EmployeeList;
