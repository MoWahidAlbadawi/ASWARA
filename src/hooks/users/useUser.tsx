import api from "@/services/axios"
import type { ApiResponseGetCurrentUser } from "@/services/types/users";
import { useQuery } from "react-query"
import { CURRENT_USER } from "@/services/endpoints";

export const getCurrentUser = () => {
    return useQuery('current-user',() => {
        return api.get<ApiResponseGetCurrentUser>(`/${CURRENT_USER}`).then(res => res.data.data);  
    })
}