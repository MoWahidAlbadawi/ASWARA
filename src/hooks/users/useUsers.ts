import { useQuery , useMutation} from "react-query";
import type { ApiResponseGetUsers , ApiResponseGetCurrentUser, AddUserInterface} from "@/services/types/users";
import api from "@/services/axios"
import { USERS , CURRENT_USER , ADD_USER, DELETE_USER} from  "@/services/endpoints"

// get all users
export const GetAllUsers = () => {
    return useQuery('users',() => {
        return api.get<ApiResponseGetUsers>(`/${USERS}`).then(res => res.data.data);  
    })
}

// get current user 
export const GetCurrentUser = () => {
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

// delete user
export const DeleteUser = () => {
    return useMutation('delete-user',(id : number) => {
        return api.post(`/${DELETE_USER}/${id}`);
    });
}