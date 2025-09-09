import type { ApiResponseGet  } from "./response";

export class filtersNotificationsDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
}

export type UnReadNotication = {
    id : string, 
    type : string,
    created_at : string,
    data : {title : string , message : string}
}

export type Notification =  UnReadNotication & {
    read_at : string | null,
}

export type ApiResponseGetAllNotifications = ApiResponseGet<Notification[]>
export type ApiResponseGetUnreadNotifications = ApiResponseGet<UnReadNotication[]>