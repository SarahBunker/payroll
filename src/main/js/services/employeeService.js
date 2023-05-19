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

// const loadFromServer = async (page, size) => {
//   try {
//     const response = await axios.get(`${root}/employees?page=${page}&size=${size}`);
//     let hal = response.data;
//     console.log({hal});
//     return hal
//   } catch (error) {
//     throw error;
//   }
// }

const loadFromServer = async (page, size) => {
  try {
    const response = await axios.get(`${root}/employees?page=${page}&size=${size}`);
    const employeeCollection = response.data;
    const schemaResponse = await axios.get(employeeCollection._links.profile.href, {
      headers: { 'Accept': 'application/schema+json' }
    });
    const schema = schemaResponse.data;
    const employeePromises = employeeCollection._embedded.employees.map(employee =>
      axios.get(employee._links.self.href)
    );
    const employeesResponse = await Promise.all(employeePromises);
    const employees = employeesResponse.map(response => response.data);

    return {
      schema: schema,
      employees: employees,
      links: employeeCollection._links
    };
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (selfLink) => {
  try {
    await axios.delete(selfLink);
  } catch (error) {
    throw error;
  }
}

const employeeService = {
  createEmployee,
  getEmployees,
  loadFromServer,
  deleteEmployee
}

export default employeeService;