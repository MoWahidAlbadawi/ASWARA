// router
import { useNavigate } from "react-router-dom";
// mutation to mutate the data by tanstack query
import { useMutation } from "react-query"
// axios
import axios from 'axios'
// cookies for storing user token 
import Cookie from 'cookie-universal'
// endpoints
import { BASE_URL, LOGIN , REGISTER } from "@/services/endpoints";
// interfaces
import type { LoginData, RegisterData } from "@/services/types/Auth";


export const useLogin = () => {
    const navigate = useNavigate();
    const cookies = Cookie();
    return useMutation((data : LoginData) => {
        return axios.post(`${BASE_URL}/api/${LOGIN}`,data).then(res => res.data);
    }, {
        onSuccess : (data : any ) => {
            console.log('login successfully!');
            cookies.set('jewely-store',data.data.token);
            navigate('/');
        },
        onError : (err : any) => {
            console.log(err,'error on send login data');
        }
    })
}

export const useRegister = () => {
    const navigate = useNavigate();
    const cookies = Cookie();
    return useMutation(((data : RegisterData) => {
        return axios.post(`${BASE_URL}/ap/${REGISTER}`,data).then(res => res.data);
    } ),{
         onSuccess : (data : any ) => {
            console.log('register successfully!');
            cookies.set('jewely-store',data.data.token);
            navigate('/');
        },
        onError : (err : any) => {
            console.log(err,'error on send register data');
        } 
    });
}