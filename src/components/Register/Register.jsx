import { useFormik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../services/authService';

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

  if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Confirm Password must be the same as password';
  }

  return errors;
};

const Register = ({ toggleDisplayLogin }) => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      registerUser(values);
    },
    validate,
  });

  const registerUser = async (values) => {
    const response = await register({
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

      <label htmlFor="confirmPassword" className="white-text">
        Confirm password
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
      />
      <p className="error">{formik.errors.confirmPassword}</p>

      <button type="submit" className="button white-button">
        Register
      </button>
      <p className="white-text account-text">
        Already have an account?
        <span className="span-link" onClick={toggleDisplayLogin}>
          {' '}
          Login here
        </span>
      </p>
    </form>
  );
};

export default Register;
