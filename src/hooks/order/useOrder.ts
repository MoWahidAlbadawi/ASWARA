import { useQuery } from "react-query";
import type { ApiResponseGetOrders , ApiResponseGetOrderById} from '@/services/types/orders'
import api from "@/services/axios"
import { ORDERS , ORDER } from  "@/services/endpoints"

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