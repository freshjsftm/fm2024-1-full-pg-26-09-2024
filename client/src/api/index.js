import axios from 'axios';
import queryString from 'query-string';

const httpClient = axios.create({
  baseURL: 'http://localhost:3000',
});

export const postUser = (values) =>
  httpClient.post('/users', values, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const getAllUsers = (options = {}) => {
  const defaultOptions = {
    page: 1,
    amount: 5,
  };
  const resultOptions = {
    ...defaultOptions,
    ...options,
  };
  return httpClient.get(`/users?${queryString.stringify(resultOptions)}`);
};
