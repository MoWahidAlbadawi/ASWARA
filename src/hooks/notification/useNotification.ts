import { useMutation, useQuery } from "react-query";
import api from "@/services/axios"
import { UNREAD_NOTIFICATIONS , READ_NOTIFICATION , NOTIFICATIONS, READ_ALL_NOTIFICATIONS } from  "@/services/endpoints"
import type { ApiResponseGetAllNotifications, ApiResponseGetUnreadNotifications } from "@/services/types/notification";

// get all Notifications
export const GetAllNotifications = () => {
    return useQuery('notifications',() => {
        return api.get<ApiResponseGetAllNotifications>(`/${NOTIFICATIONS}`).then(res => res.data.data);  
    })
}

// get all un read notifications
export const GetAllUnReadNotifications = () => {
    return useQuery('unread-notifications',() => {
        return api.get<ApiResponseGetUnreadNotifications>(`/${UNREAD_NOTIFICATIONS}`).then(res => res.data.data);  
    })
}
// read notification
export const ReadNotification = () => {
    return useMutation('read-notification',(id : string) => {
        return api.put(`/${READ_NOTIFICATION}/${id}/read`).then(res => res.data.data);  
    })
}

// read all notifications
export const ReadAllNotifications = () => {
    return useMutation('read-all-notifications',() => {
        return api.put(`/${READ_ALL_NOTIFICATIONS}`).then(res => res.data.data);  
    })
}

