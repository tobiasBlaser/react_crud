import config from '../config';

const getDefaultHeaders = (useAuth = true) => {
  let headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (useAuth) {
    headers.Authorization = `Bearer ${getToken()}`;
  }

  return headers;
};

const getToken = () => {
  const response = JSON.parse(window.localStorage.getItem('token'));
  return response.value;
};

const request = async (url, method = 'GET', payload = null, headers = {}) => {
  const defaultHeaders = await getDefaultHeaders(
    !url.includes('login') && !url.includes('register') && !url.includes('user')
  );

  const requestBody = {
    method: method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };
  if (payload) {
    requestBody.body = JSON.stringify(payload);
  }

  return fetch(`${config.apiUrl}${url}`, requestBody).then((response) => {
    return response ? response.json() : false;
  });
};

export { request };
