import React, { useState } from 'react';

function CreateDialog({ attributes, onCreate }) {
  const [employeeData, setEmployeeData] = useState({}); // State for holding form data

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

    // Navigate away from the dialog to hide it.
    window.location = '#';
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
    <div>
      <a href="#createEmployee">Create</a>

      <div id="createEmployee" className="modalDialog">
        <div>
          <a href="#" title="Close" className="close">
            X
          </a>

          <h2>Create new employee</h2>

          <form>
            {inputs}
            <button onClick={handleSubmit}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDialog;
