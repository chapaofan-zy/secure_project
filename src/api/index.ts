import axios from 'axios';

const axiosEntity = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  timeout: 2000,
});

axiosEntity.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

axiosEntity.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      window.location.replace('/unlogin');
    }
    return error;
  },
);

export default axiosEntity;
