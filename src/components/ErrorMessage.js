import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>Error: {message}</p>
  </div>
);

export default ErrorMessage; 