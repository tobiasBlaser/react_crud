import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login, register } from '../../services/authService';
import { getToken } from '../../services/fetchService';
import { validateUser } from '../../services/validationService';
import './Login.css';

const Login = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const history = useHistory();

  const toggleDisplayLogin = () => setDisplayLogin(!displayLogin);

  const reRoute = () => {
    if (getToken()) {
      history.push('tracks');
    }
  };

  const validate = () => {
    const validatedUser = validateUser(username, password, confirmPassword);

    setUsernameError(validatedUser.usernameError);
    setPasswordError(validatedUser.passwordError);
    setConfirmPasswordError(validatedUser.confirmPasswordError);

    return validateUser;
  };

  const registerUser = async () => {
    const validatedUser = validate();
    if (
      !validatedUser.usernameError &&
      !validatedUser.passwordError &&
      !validatedUser.confirmPasswordError
    ) {
      const response = await register({ username, password });
      if (response.id) {
        history.push('tracks');
      }
    }
  };

  const loginUser = async () => {
    const validatedUser = validate();
    if (!validatedUser.usernameError && !validatedUser.passwordError) {
      const response = await login({ username, password });
      if (response.id) {
        history.push('tracks');
      } else {
        setPasswordError('Credentials not correct');
      }
    }
  };

  const renderLogin = () => {
    reRoute();
    return (
      <div id="login-container">
        <label htmlFor="username-input" className="white-text">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p className="error">{usernameError}</p>

        <label htmlFor="password-input" className="white-text">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="error">{passwordError}</p>

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
    reRoute();
    return (
      <div id="login-container">
        <label htmlFor="username-input" className="white-text">
          Username
        </label>
        <input
          id="username-input"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <p className="error">{usernameError}</p>

        <label htmlFor="password-input" className="white-text">
          Password
        </label>
        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <p className="error">{passwordError}</p>

        <label htmlFor="confirm-password-input" className="white-text">
          Confirm password
        </label>
        <input
          id="confirm-password-input"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <p className="error">{confirmPasswordError}</p>

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
