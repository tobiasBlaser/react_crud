import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../services/authService';
import './Login.css';

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const history = useHistory();

  const toggleDisplayLogin = () => setDisplayLogin(!displayLogin);
  const resetState = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const registerUser = async () => {
    if (username && password) {
      const response = await register({ username, password });
      if (response.id) {
        resetState();
        history.push('/tracks');
      }
    }
  };

  const loginUser = async () => {
    if (username && password) {
      const response = await login({ username, password });
      if (response.id) {
        resetState();
        history.push('/tracks');
      }
    }
  };

  const renderLogin = () => {
    return (
      <div id="login-container">
        <label htmlFor="username-input" className="white-text">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password-input" className="white-text">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div onClick={loginUser} className="button white-button">
          Login
        </div>
        <p className="white-text account-text">
          Don't have an account yet?
          <span className="span-link" onClick={toggleDisplayLogin}>
            {' '}
            Register here
          </span>
        </p>
      </div>
    );
  };

  const renderRegister = () => {
    return (
      <div id="login-container">
        <label htmlFor="username-input" className="white-text">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password-input" className="white-text">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="confirm-password-input" className="white-text">
          Confirm password
        </label>
        <input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <div onClick={registerUser} className="button white-button">
          Register
        </div>
        <p className="white-text account-text">
          Already have an account?
          <span className="span-link" onClick={toggleDisplayLogin}>
            {' '}
            Login here
          </span>
        </p>
      </div>
    );
  };

  return <div>{displayLogin ? renderLogin() : renderRegister()}</div>;
};

export default Login;
