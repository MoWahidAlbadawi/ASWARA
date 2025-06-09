import { myAxios } from "@/services/axios"
import type { ApiResponseGetCurrentUser } from "@/services/types/users";
import { useQuery } from "react-query"

export const getCurrentUser = () => {
    return useQuery('current-user',() => {
        return myAxios.get<ApiResponseGetCurrentUser>('/user/current').then(res => res.data.data);  
    })
}