import axios from 'axios';

const root = "/api";
const pageSize = 2;

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${root}/employees`, employeeData);
    return response.data;
  } catch (error) {
    console.error('Error Fetching employees:', error);
    throw error;
  }
}

const getEmployees = async () => {
  try {
    const response = await axios.get(`${root}/employees?size=${pageSize}`);
    return response.data._embedded.employees;
  } catch (error) {
    throw error;
  }
}

const employeeService = {
  createEmployee,
  getEmployees
}

export default employeeService;