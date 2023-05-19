import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import employeeService from './services/employeeService';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [pages, setPages] = useState({});
  const [links, setLinks] = useState({});
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);

  const fetchState = async (page, size) => {
    try {
      const hal = await employeeService.loadFromServer(page, size);
      let links = modifyBackendUrls(hal.links)
      setLinks(links);
      // setPages(hal.employees.length);
      setEmployees(hal.employees);
    } catch (error) {
      console.error('Error updating state:', error);
    }
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

  useEffect(() => {
    const [queryPage, querySize] = getParams();
    fetchState(queryPage, querySize);
  }, [page, size]);
  
  async function onCreate(employeeData) {
    try {
      await employeeService.createEmployee(employeeData);
      await fetchState();
      closeModal();
      // go to last page
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }

  async function handleUpdate(employee, updatedEmployee) {
    console.log("handle update function");
    console.log({employee});
    try {
      await employeeService.updateEmployee(employee._links.self.href, updatedEmployee, employee.headers.Etag);
      await fetchState();
    } catch (error) {
      if (error.response && error.response.status === 412) {
        alert(`DENIED: Unable to update ${employee.entity._links.self.href}. Your copy is stale.`);
      } else {
        console.error('Error updating employee:', error);
      }
    }
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getParams = () => {
    const queryParameters = new URLSearchParams(location.search);
    let queryPage = queryParameters.get("page");
    let querySize = queryParameters.get("size");
    if (!queryPage) queryPage = page;
    if (!querySize) querySize = size;
    return [queryPage, querySize];
  }

  const handleDelete = async(selfLink) => {
    try {
      await employeeService.deleteEmployee(selfLink);
      await fetchState();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  }

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSize(newSize);
    setPage(0);
    fetchState(0, newSize);
  };  

  return (
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={
            <EmployeeList
              employees={employees}
              onCreate={onCreate}
              isModalOpen={isModalOpen}
              closeModal={closeModal}
              openModal={openModal}
              links={links}
              handleDelete={handleDelete}
              handleSizeChange={handleSizeChange}
              size={size}
              handleUpdate={handleUpdate}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
