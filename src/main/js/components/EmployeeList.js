import React from 'react';
import { Link } from 'react-router-dom';
import Employee from './Employee';
import CreateDialog from './CreateDialog';
import UpdateDialog from './UpdateDialog';
import NavBar from './NavBar';

function EmployeeList({ employees, onCreate, isModalOpen, openModal, closeModal, links, handleDelete, handleSizeChange, size}) {
  const attributes = ['firstName', 'lastName', 'description']

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
        <div style={{ paddingTop: '10px' }}>
          <label htmlFor="size-select">Number of Records:</label>
          <select id="size-select" value={size} onChange={handleSizeChange}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      
      <table className="employee-table">
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Description</th>
          </tr>
          {employees.map((employee) => (
            <Employee key={employee._links.self.href} employee={employee} handleDelete={handleDelete}/>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            {/* <CreateDialog
              onCreate={onCreate}
              onClose={closeModal}
              attributes={['firstName', 'lastName', 'description']}
            /> */}
            <UpdateDialog
              onUpdate={onCreate}
              onClose={closeModal}
              attributes={attributes}
              employee={employees[0]}
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
