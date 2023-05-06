import { message } from 'antd';
import axios from 'axios';

const axiosEntity = axios.create({
  baseURL: 'http://127.0.0.1:3001/api',
  // baseURL: 'http://223.2.19.78:3001/api',
  // baseURL: 'https://secure-project.onrender.com/api',
  withCredentials: true,
  timeout: 2000,
});

axiosEntity.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
  return config;
});

axiosEntity.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      message.error({ content: '未登录！', duration: 2 });
      window.sessionStorage.removeItem('token');
      setTimeout(() => {
        window.location.replace('/');
      }, 2000);
    }
    return error;
  },
);

export default axiosEntity;
