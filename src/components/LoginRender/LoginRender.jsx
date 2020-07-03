import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../services/fetchService';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './LoginRender.css';

const LoginRender = () => {
  const [displayLogin, setDisplayLogin] = useState(true);
  const history = useHistory();

  const toggleDisplayLogin = () => setDisplayLogin(!displayLogin);

  const render = () => {
    if (getToken()) {
      history.push('tracks');
    }
    return displayLogin ? (
      <Login toggleDisplayLogin={toggleDisplayLogin} />
    ) : (
      <Register toggleDisplayLogin={toggleDisplayLogin} />
    );
  };

  return <div>{render()}</div>;
};

export default LoginRender;
