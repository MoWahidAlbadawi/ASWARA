import axios from 'axios'
import Cookie from 'cookie-universal'

const cookies = Cookie(); 

const api = axios.create({
    baseURL : 'https://jewelrystore-production.up.railway.app/api',

});

api.interceptors.request.use((config) => {
  const token = cookies.get('aswara');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
