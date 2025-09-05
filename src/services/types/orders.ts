import type { ApiResponseGet  } from "./response";

export class filtersOrderDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    status : string = '';

}

export type Order = {
    id : number,
    userid : number,
    orderDate : string,
    status : string,
    totalAmount : string | number,
    shippingAddress : string,
    paymentMethod : string
}

export type OrderById =  {
    userid : number,
    orderDate : string,
    status : string,
    totalAmount : number,
}

export type ApiResponseGetOrderById = ApiResponseGet<OrderById>
export type ApiResponseGetOrders = ApiResponseGet<Order[]>