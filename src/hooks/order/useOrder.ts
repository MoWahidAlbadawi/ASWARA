import { useMutation, useQuery } from "react-query";
import type { ApiResponseGetOrders , ApiResponseGetOrderById , OrderStatus} from '@/services/types/orders'
import api from "@/services/axios"
import { ORDERS , ORDER, UPDATE_ORDER } from  "@/services/endpoints"

// get all orders
export const GetAllOrders = () => {
    return useQuery('orders',() => {
        return api.get<ApiResponseGetOrders>(`/${ORDERS}`).then(res => res.data.data);  
    })
}


// get order by id 
export const GetOrderById = (id : (number | string)) => {
    return useQuery(['show-order',id],() => {
        return api.get<ApiResponseGetOrderById>(`/${ORDER}/${id}`).then(res => res.data.data);
    })
}

export const UpdateOrderStatus = (id : number | string) => {
    return useMutation(['update-order-status',id],(payload :{Status :  OrderStatus}) => {
        return api.post(`/${UPDATE_ORDER}/${id}`,payload).then(res => res.data.data);
    })
}