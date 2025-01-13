import React, { useState } from 'react';

const PasswordResetForm = ({ handleReset }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    handleReset(email);
  };

  return (
    <div className="password-reset-form">
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
