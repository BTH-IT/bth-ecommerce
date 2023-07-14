import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEST_SERVER_URL || "",
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGFkNDc5YjI4NGIyMTY5ZGYxMjNhNTAiLCJlbWFpbCI6ImJ0aHVuZ0BnbWFpbC5jb20iLCJyb2xlIjoiNjRhYWY1ZjE1YjQ0OTE5MjcwN2RkZTc4IiwidHlwZSI6ImRlZmF1bHQiLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMVQxMjoxNDoxOS44NjhaIiwidXBkYXRlZEF0IjoiMjAyMy0wNy0xMVQxMjoxNDoxOS44NjhaIiwiX192IjowLCJpYXQiOjE2ODkzNDkwODgsImV4cCI6MTY4OTQzNTQ4OH0.XWsxG_PBfMkFKi1xWtukMcZCM-s5JBWhGwLj4Lx7bSo`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.data.errors) {
      return response.data.errors[0].extensions.originalError;
    } else {
      return {
        data: response.data.data,
        statusCode: 200,
      };
    }
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
