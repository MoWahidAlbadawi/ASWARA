import type { ApiResponseGet  } from "./response";

export class filtersReviewRequestsDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    status?: ReviewRequestStatus = 'all'; 
}

export type ReviewRequestStatus = 'all' | 'pending' | 'rejected' | 'approved';

export type ReviewRequest = {
    ReviewID : number | string,
    UserID : number | string,
    ProductName : string,
    ProductDescription : string,
    ProductWeight : number,
    ProductPrice : number,
    ProductImages : string,
    TotalAmount : string | number,
    Status : ReviewRequestStatus,
    PaymentMethod : string,
    created_at : string,
    updated_at : string,
}

export type ApiResponseGetReviewRequests = ApiResponseGet<ReviewRequest[]>