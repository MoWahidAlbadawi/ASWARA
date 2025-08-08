import { useQuery , useMutation} from "react-query";
import type { ApiResponseGetUsers , ApiResponseGetCurrentUser, AddUserInterface, ApiResponseGetUserById, ModifyUserInterface} from "@/services/types/users";
import api from "@/services/axios"
import { USERS , USER ,  CURRENT_USER , ADD_USER, DELETE_USER, MODIFY_USER} from  "@/services/endpoints"

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
    return api.post(`/${ADD_USER}`,data);
    }));
}

// get user by id 
export const GetUserById = (id : (number | string)) => {
    return useQuery(['user-by-id',id],() => {
        return api.get<ApiResponseGetUserById>(`/${USER}/${id}`).then(res => res.data.data);
    })
}
// modify user
export const UpdateUser = (id : number | string) => {
    return useMutation(['modify-user',id],(data : ModifyUserInterface) => {
        return api.put(`/${MODIFY_USER}/${id}`,data);
    });
}

// delete user
export const DeleteUser = () => {
    return useMutation('delete-user',(id : number) => {
        return api.post(`/${DELETE_USER}/${id}`);
    });
}