import axios from 'axios';

const root = "/api";

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${root}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error Fetching employees:', error);
    throw error;
  }
}

const getEmployees = async (page, size) => {
  try {
    const response = await axios.get(`${root}/employees?page=${page}&size=${size}`);
    let hal = response.data;
    console.log({hal})
    return response.data._embedded.employees;
  } catch (error) {
    throw error;
  }
}

const loadFromServer = async (page, size) => {
  try {
    const response = await axios.get(`${root}/employees?page=${page}&size=${size}`);
    let hal = response.data;
    console.log({hal});
    return hal
  } catch (error) {
    throw error;
  }
} 

const employeeService = {
  createEmployee,
  getEmployees,
  loadFromServer
}

export default employeeService;