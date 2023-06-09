import React, { useState, useEffect } from 'react';
import Employee from './Employee';
import CreateDialog from './CreateDialog';
import UpdateDialog from './UpdateDialog';
import NavBar from './NavBar';

import employeeService from '../services/employeeService';

function EmployeeList() {
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [links, setLinks] = useState({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const attributes = ['firstName', 'lastName', 'description']

  useEffect(() => {
    const [queryPage, querySize] = getParams();
    setPage(queryPage);
    setSize(querySize);
  }, [location.search]);
  

  useEffect(() => {
    fetchState(page, size);
  }, [page, size]);

  const fetchState = async (page, size) => {
    try {
      const hal = await employeeService.loadFromServer(page, size);
      let links = modifyBackendUrls(hal.links)
      setLinks(links);
      setEmployees(hal.employees);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  const getParams = () => {
    const queryParameters = new URLSearchParams(location.search);
    let queryPage = queryParameters.get("page");
    let querySize = queryParameters.get("size");
    if (!queryPage) queryPage = page;
    if (!querySize) querySize = size;
    return [queryPage, querySize];
  };

  function modifyBackendUrls(links) {
    const modifiedLinks = {};
  
    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        const url = links[key].href;
        const modifiedUrl = url.replace('/api/employees', '/');
        modifiedLinks[key] = {
          href: modifiedUrl
        };
      }
    }
  
    return modifiedLinks;
  }
  
  async function handleCreate(employeeData) {
    try {
      await employeeService.createEmployee(employeeData);
      closeModal();
      alert(`Employee [${employeeData.firstName} | ${employeeData.lastName} | ${employeeData.description}] created successfully`);
    } catch (error) {
      console.error('Error creating employee:', error);
    } finally {
      await fetchState(page, size);
    }
  }

  async function handleUpdate(employee, updatedEmployee) {
    try {
      await employeeService.updateEmployee(employee._links.self.href, updatedEmployee, employee.headers.Etag);
      alert(`Employee [${updatedEmployee.firstName} | ${updatedEmployee.lastName} | ${updatedEmployee.description}] updated successfully`);
    } catch (error) {
      if (error.response && error.response.status === 412) {
        console.log({employee})
        alert(`DENIED: Unable to update ${employee._links.self.href}. Your copy is stale.`);
      } else {
        console.error('Error updating employee:', error);
      }
    } finally {
      await fetchState(page, size);
    }
  }

  const handleDelete = async(selfLink) => {
    try {
      await employeeService.deleteEmployee(selfLink);
      alert(`Employee deleted successfully`);
    } catch (error) {
      console.error('Error deleting employee:', error);
    } finally {
      await fetchState(page, size);
    }
  }

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    setPage(0);
    fetchState(0, newSize);
  };
  
  const openUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedEmployee(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='container'>
        <button onClick={openModal}>Create</button>
        <div style={{ paddingTop: '10px' }}>
          <select id="size-select" value={size} onChange={handleSizeChange}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <label htmlFor="size-select">  Number of Records Per Page</label>
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
            <Employee 
              key={employee._links.self.href}
              employee={employee}
              handleDelete={handleDelete}
              clickUpdate={openUpdateModal}
            />
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <CreateDialog
              handleCreate={handleCreate}
              onClose={closeModal}
              attributes={attributes}
            />
          </div>
        </div>
      )}
      {isUpdateModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <UpdateDialog
              handleUpdate={handleUpdate}
              employee={selectedEmployee}
              onClose={closeUpdateModal}
              attributes={attributes}
            />
          </div>
        </div>
      )}
      <NavBar links={links} />
    </div>
  );
}

export default EmployeeList;
