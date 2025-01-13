import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LoginForm = ({ handleLogin }) => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password: password
    };

    handleLogin(user);

    history.push('/user-account');
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary">Login</button>
        <Link to="/register">Create an account</Link>
      </form>
    </div>
  );
};

export default LoginForm;
