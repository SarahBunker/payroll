import axios from 'axios';

const root = "/api";

const createEmployee = async (employeeData) => {
  try {
    const response = await axios.post(`${root}/employees`, employeeData);
    console.log("employee Service");
    return response.data;
  } catch (error) {
    console.error('Error Fetching employees:', error);
    throw error;
  }
}

const updateEmployee = async (employeeUrl, updatedEmployeeData, etag) => {
  try {
    const response = await axios.put(employeeUrl, updatedEmployeeData, {
      headers: {
        'Content-Type': 'application/json',
        'If-Match': etag
      }
    });
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Service Error updating employee: ${response.status}`);
    }
  } catch (error) {
    throw error; // Return the error instead of throwing it
  }
};


const loadFromServer = async (page, size) => {
  try {
    const response = await axios.get(`${root}/employees?page=${page}&size=${size}`);
    const employeeCollection = response.data;
    const schemaResponse = await axios.get(employeeCollection._links.profile.href, {
      headers: { 'Accept': 'application/schema+json' }
    });
    const schema = schemaResponse.data;
    const employeePromises = employeeCollection._embedded.employees.map(async (employee) => {
      const employeeResponse = await axios.get(employee._links.self.href);
      const etag = employeeResponse.headers.etag;
      const employeeData = employeeResponse.data;
      employeeData.headers = { Etag: etag };
      return employeeData;
    });
    const employees = await Promise.all(employeePromises);

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
  loadFromServer,
  deleteEmployee,
  updateEmployee
}

export default employeeService;