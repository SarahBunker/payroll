import React, { useState } from 'react';

function UpdateDialog({ attributes, employee, handleUpdate, onClose }) {
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({...employee});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData((prevData) => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(employee, updatedEmployeeData);

    // Clear out the dialog's inputs
    setUpdatedEmployeeData({});
    onClose();
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
          <h2>Update employee</h2>
          <form>
            {inputs}
            <button onClick={handleSubmit}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateDialog;