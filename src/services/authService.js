import { request } from './fetchService';

const login = async (data) => {
  const response = await request('login', 'POST', data);
  if (response.token) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const item = {
      value: response.token,
      expiry: tomorrow.getTime(),
    };
    window.localStorage.setItem('token', JSON.stringify(item));
    return response;
  }
  return false;
};

const register = async (data) => {
  const response = await request('register', 'POST', data);
  if (response.token) {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const item = {
      value: response.token,
      expiry: tomorrow.getTime(),
    };
    window.localStorage.setItem('token', JSON.stringify(item));
    return response;
  }
  return false;
};

export { login, register };
