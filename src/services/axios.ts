import axios from 'axios'
import Cookie from 'cookie-universal'
import { BASE_URL, COOKIE_NAME } from './endpoints';
const cookies = Cookie(); 

const api = axios.create({
    baseURL : `${BASE_URL}/api`,
});

api.interceptors.request.use((request) => {
  const token = cookies.get(COOKIE_NAME);
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

export default api;
