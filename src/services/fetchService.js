import config from '../config';

const getDefaultHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${getToken()}`,
});

const getToken = () => {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiYjk1NjU5NmUtODY0YS00ZWU1LTliOWYtYmY3MWE2NDI0NzJjIiwidXNlcm5hbWUiOiJ0ZXN0IiwicGFzc3dvcmQiOiIkMmEkMTAka2QxTkdsOE52YVBabDJIeDdEcHlSdTg2TUllLjIuTTNJekRDZ2g0YUdEcmEvbWtiQ25pblcifSwiaWF0IjoxNTkzMDg4NzU0LCJleHAiOjE1OTMxNzUxNTR9.9y2MHNAF_PR_Y2OKRajjxtZe009h6sXOIiwVBT__z1g';
};

const request = async (url, method = 'get', payload = null, headers = {}) => {
  const defaultHeaders = getDefaultHeaders();

  const requestBody = {
    method: method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
  };
  if (payload) {
    requestBody.body = payload;
  }

  return fetch(`${config.apiUrl}${url}`, requestBody).then((response) =>
    response.json()
  );
};

export { request };
