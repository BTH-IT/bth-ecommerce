import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEST_SERVER_URL || 'http://localhost:5000/graphql',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (typeof window !== 'undefined') {
      config.headers.Authorization = `Bearer ${
        localStorage.getItem('access_token') || ' '
      }`;
    } else {
      config.headers.Authorization = `Bearer ${' '}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (response.data.errors) {
      return (
        response.data.errors[0].extensions.originalError || {
          data: [],
          statusCode: 500,
          message: 'Error Server',
        }
      );
    }

    return {
      data: response.data.data,
      statusCode: 200,
    };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

export default axiosClient;
