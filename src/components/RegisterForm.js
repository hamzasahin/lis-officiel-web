import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterForm = ({ handleRegister }) => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      fullName: fullName,
      email: email,
      password: password
    };

    handleRegister(user);

    navigate('/user-account');
  };

  return (
    <div className="register-form">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Create Account</button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
};

export default RegisterForm;
