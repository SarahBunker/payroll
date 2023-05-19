import React, { useState } from 'react';

function UpdateDialog({ attributes, employee, onUpdate, onClose }) {
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData((prevData) => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(employee, updatedEmployeeData);

    // Clear out the dialog's inputs
    setUpdatedEmployeeData({});
  };

  const inputs = attributes.map((attribute) => (
    <p key={attribute}>
      <input
        type="text"
        placeholder={attribute}
        name={attribute}
        value={updatedEmployeeData[attribute] || employee[attribute] || ''}
        onChange={handleChange}
        className="field"
      />
    </p>
  ));

  const dialogId = `updateEmployee-${employee._links.self.href}`;

  return (
    <div key={employee._links.self.href}>
      <div id={dialogId} className="modalDialog">
        <button className="modal-close" onClick={onClose}>
          <span className="close-icon">X</span>
        </button>
        <div>
          <h2>Update an employee</h2>
          <form>
            {inputs}
            <button onClick={handleSubmit}>Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDialog;