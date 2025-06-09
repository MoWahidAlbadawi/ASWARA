import axios from 'axios'
import Cookie from 'cookie-universal'

const cookies = Cookie(); 

export const myAxios = axios.create({
    baseURL : 'https://jewelrystore-production.up.railway.app/api',
    headers : {
        'Authorization' : `Bearer ${cookies.get('jewelry-store')}`
    }
});
