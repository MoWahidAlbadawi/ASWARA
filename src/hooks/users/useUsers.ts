import { useQuery , useMutation} from "react-query";
import type { ApiResponseGetUsers , ApiResponseGetCurrentUser, AddUserInterface} from "@/services/types/users";
import api from "@/services/axios"
import { USERS , CURRENT_USER , ADD_USER} from  "@/services/endpoints"

// get all users
export const getAllUsers = () => {
    return useQuery('users',() => {
        return api.get<ApiResponseGetUsers>(`/${USERS}`).then(res => res.data.data);  
    })
}

// get current user 
export const getCurrentUser = () => {
    return useQuery('current-user',() => {
        return api.get<ApiResponseGetCurrentUser>(`/${CURRENT_USER}`).then(res => res.data.data);  
    })
}

// add user 
export const AddNewUser = () => {
    return useMutation(((data : AddUserInterface) => {
    return api.post(`/${ADD_USER}`,data).then(res => res.data);
    } ),{
         onSuccess : (data : any ) => {
            console.log('user added successfully!',data);
        },
        onError : (err : any) => {
            console.log(err,'error on Add new user');
        } 
    });
}


// modify user
