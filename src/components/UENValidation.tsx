// src/components/UENValidation.tsx
import { useState } from "react";
import './UENValidation.css'; //Importing CSS for styling

// Function to validate UEN based on the provided formats
const validateUEN = (uen: string) => {
  const businessFormat = /^[0-9]{8}[A-Z]$/;  // e.g., 12345678A
  const localCompanyFormat = /^(19|20)[0-9]{6}[A-Z]$/;  // e.g., 199012345X
  const otherEntityFormat = /^[SRT]\d{2}[A-Z]{2}[0-9]{4}[A-Z]$/;  // e.g., T08LL1234A

  return businessFormat.test(uen) || localCompanyFormat.test(uen) || otherEntityFormat.test(uen);
};

const UENValidation = () => {
  const [uen, setUen] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (validateUEN(uen)) {
      setIsValid(true);
      setErrorMessage('');
    } else {
      setIsValid(false);
      setErrorMessage('Invalid UEN format.');
    }
  };

  return (
    <div className="container">
      <h3 className="title">UEN Validation</h3>
      <div className="form-group">
        <input
          type="text"
          className="uen-input"
          value={uen}
          onChange={(e) => setUen(e.target.value)}
          placeholder="Enter UEN"
        />
      </div>
      <button className= "validate-button" onClick={handleSubmit}>
        Validate
      </button>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {isValid && !errorMessage && <p className="success-message">Valid UEN!</p>}


      
    </div>
  );
};

export default UENValidation;
