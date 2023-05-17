import React from 'react';
import { Link } from 'react-router-dom';
import Employee from './Employee';
import CreateDialog from './CreateDialog';
import NavBar from './NavBar';

function EmployeeList({ employees, onCreate, isModalOpen, openModal, closeModal, links}) {

  const navLinks = [];
  if ("first" in links) {
    const linkUrl = links.first.href;
    navLinks.push(
      <Link key="first" to={linkUrl}>
        &lt;&lt;
      </Link>
    );
  }
  if ("prev" in links) {
    const linkUrl = links.prev.href;
    navLinks.push(
      <Link key="prev" to={linkUrl}>
        &lt;
      </Link>
    );
  }
  if ("next" in links) {
    const linkUrl = links.next.href;
    navLinks.push(
      <Link key="next" to={linkUrl}>
        &gt;
      </Link>
    );
  }
  if ("last" in links) {
    const linkUrl = links.last.href;
    navLinks.push(
      <Link key="last" to={linkUrl}>
        &gt;&gt;
      </Link>
    );
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
      {/* {navLinks}
       */}
      <NavBar links={links} />
    </div>
  );
}

export default EmployeeList;
