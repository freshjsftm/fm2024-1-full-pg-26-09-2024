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

export const getOneUser = (id) => httpClient.get(`/users/${id}`);
export const delOneUser = (id) => httpClient.delete(`/users/${id}`);

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

export const getAllTasks = (options = {}) => {
  const defaultOptions = {
    page: 1,
    amount: 5,
  };
  const resultOptions = {
    ...defaultOptions,
    ...options,
    id:undefined
  };
  // console.log(`/users/${options.id}/tasks?${queryString.stringify(resultOptions)}`);
  
  return httpClient.get(
    `/users/${options.id}/tasks`
  );
};
