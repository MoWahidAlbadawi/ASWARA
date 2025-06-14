import axios from 'axios'
import Cookie from 'cookie-universal'
import { BASE_URL } from './endpoints';
const cookies = Cookie(); 

const api = axios.create({
    baseURL : `${BASE_URL}/api`,

});

api.interceptors.request.use((config) => {
  const token = cookies.get('aswara');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
