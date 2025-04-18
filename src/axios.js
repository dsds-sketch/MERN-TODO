import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/todos/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchTodo = async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (err) {
    console.error('Error fetching todos:', err.message, err.config);
    throw err;
  }
};

export const createTodo = async (description) => {
  try {
    const response = await axiosInstance.post('/', { description });
    return response.data;
  } catch (err) {
    console.error('Error creating todo:', err.message, err.config);
    throw err;
  }
};

export default axiosInstance;