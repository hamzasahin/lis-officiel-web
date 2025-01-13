import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginRegisterPage = () => {
  return (
    <div className="login-register-page">
      <div className="login-register-form-container">
        <LoginForm />
        <hr />
        <RegisterForm />
      </div>
    </div>
  );
};

export default LoginRegisterPage;
