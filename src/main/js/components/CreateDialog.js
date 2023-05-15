import React, { useState } from 'react';

function CreateDialog({ attributes, onCreate, onClose }) {
  const [employeeData, setEmployeeData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value.trim()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(employeeData);

    // Clear out the dialog's inputs
    setEmployeeData({});
  };

  const inputs = attributes.map((attribute) => (
    <p key={attribute}>
      <input
        type="text"
        placeholder={attribute}
        name={attribute}
        value={employeeData[attribute] || ''}
        onChange={handleChange}
        className="field"
      />
    </p>
  ));

  return (
    <div id="createEmployee" className="modal-dialog">
      <button className="modal-close" onClick={onClose}>
        <span className="close-icon">X</span>
      </button>
      <h2>Create new employee</h2>
      <form>
        {inputs}
        <button onClick={handleSubmit}>Create</button>
      </form>
    </div>
  );
}

export default CreateDialog;
