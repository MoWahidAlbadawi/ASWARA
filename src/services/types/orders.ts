import type { ApiResponseGet  } from "./response";

export class filtersOrderDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    status : OrderStatus = 'all';

}

export type Order = {
    OrderID : number | string,
    UserID : number | string,
    Status : OrderStatus,
    TotalAmount : string | number,
    ShippingAddress : string,
    PaymentMethod : string,
    created_at : string,
    updated_at : string,
    order_detials : OrderDetails[]
}

export type OrderDetails = {
    OrderDetailID : string | number,
    OrderId : string | number,
    ProductID : string | number,
    Quantity : string | number,
    PriceAtPurchase :  number,
    created_at : string,
    updated_at : string
}

export type OrderStatus = 'all' | 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';   

export type OrderById = Order;

export type ApiResponseGetOrderById = ApiResponseGet<OrderById>
export type ApiResponseGetOrders = ApiResponseGet<Order[]>