import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../../services/authService';

const validate = (values) => {
  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
  );

  const errors = {};

  if (!values.username) {
    errors.username = 'Username field cannot be empty';
  } else if (values.username.length > 50) {
    errors.username = 'Username cannot be more then 50 chars';
  }

  if (!passwordRegex.test(values.password)) {
    errors.password =
      'Password must be 8+ digets, have a number, 1 upper- and lowercase char';
  }

  return errors;
};

const Login = ({ toggleDisplayLogin }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      loginUser(values);
    },
    validate,
  });

  const loginUser = async (values) => {
    const response = await login({
      username: values.username,
      password: values.password,
    });
    if (response.id) {
      history.push('tracks');
    }
  };

  return (
    <form id="login-container" onSubmit={formik.handleSubmit}>
      <label htmlFor="username" className="white-text">
        Username
      </label>
      <input
        id="username"
        type="text"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <p className="error">{formik.errors.username}</p>

      <label htmlFor="password" className="white-text">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      <p className="error">{formik.errors.password}</p>

      <button type="submit" className="button white-button">
        Login
      </button>
      <p className="white-text account-text">
        Don't have an account yet?
        <span className="span-link" onClick={toggleDisplayLogin}>
          {' '}
          Register here
        </span>
      </p>
    </form>
  );
};

export default Login;
