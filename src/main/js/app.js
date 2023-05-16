import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import employeeService from './services/employeeService';
import EmployeeList from './components/EmployeeList';

function App() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pages, setPages] = useState({});
  const [links, setLinks] = useState({});

  const fetchState = async (page, size) => {
    try {
      const hal = await employeeService.loadFromServer(page, size);
      let links = modifyBackendUrls(hal._links)
      setLinks(links);
      setPages(hal.pages);
      setEmployees(hal._embedded.employees);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  function modifyBackendUrls(links) {
    const modifiedLinks = {};
  
    for (const key in links) {
      if (links.hasOwnProperty(key)) {
        const url = links[key].href;
        const modifiedUrl = url.replace('/api/', '/');
        modifiedLinks[key] = {
          href: modifiedUrl
        };
      }
    }
  
    return modifiedLinks;
  }

  useEffect(() => {
    let [page, size] = getParams();
    fetchState(page, size);
  }, []);
  
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    console.log("clicked Nav");
  }

  const getParams = () => {
    const queryParameters = new URLSearchParams(location.search);
    let queryPage = queryParameters.get("page");
    let querySize = queryParameters.get("size");
    if (!queryPage) queryPage = 0;
    if (!querySize) querySize = 10;
    return [queryPage, querySize];
  }

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
              handleNavClick={handleNavClick}
              links={links}
          />} />
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('react'));
