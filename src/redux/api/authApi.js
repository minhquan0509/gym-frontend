import axios from 'axios';

export const loginApi = async (username, password) => {
  try {
    const response = await axios.post('${process.env.REACT_APP_API_URL}/users/login', {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error('Invalid username or password');
  }
};