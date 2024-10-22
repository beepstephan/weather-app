import axios from 'axios';

export const loginUser = async (username, password) => {
  const response = await axios.post('http://localhost:3000/auth/login', {
    username,
    password,
  });
  return response.data;
};

export const registerUser = async (username, password) => {
  await axios.post('http://localhost:3000/users/register', {
    username,
    password,
  });
};