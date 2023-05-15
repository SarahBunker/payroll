import React, { useRef } from 'react';

function CreateDialog({ attributes, onCreate }) {
  const formRefs = attributes.reduce((acc, attribute) => {
    acc[attribute] = useRef(null);
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {};

    attributes.forEach(attribute => {
      newEmployee[attribute] = formRefs[attribute].current.value.trim();
    });

    onCreate(newEmployee);

    // Clear out the dialog's inputs
    attributes.forEach(attribute => {
      formRefs[attribute].current.value = '';
    });

    // Navigate away from the dialog to hide it.
    window.location = '#';
  };

  const inputs = attributes.map(attribute => (
    <p key={attribute}>
      <input type="text" placeholder={attribute} ref={formRefs[attribute]} className="field" />
    </p>
  ));

  return (
    <div>
      <a href="#createEmployee">Create</a>

      <div id="createEmployee" className="modalDialog">
        <div>
          <a href="#" title="Close" className="close">X</a>

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