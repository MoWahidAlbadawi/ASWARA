import type { ApiResponseGet  } from "./response";

export class filtersOrderDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    status : string = '';

}

export interface Order {
    id : number,
    userid : number,
    orderDate : string,
    status : string,
    totalAmount : string | number,
    shippingAddress : string,
    paymentMethod : string
}


export type ApiResponseGetOrderById = ApiResponseGet<Order>
export type ApiResponseGetOrders = ApiResponseGet<Order[]>