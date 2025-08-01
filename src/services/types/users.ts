import type { ApiResponseGet } from "./response"

export class filtersUserDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
}

export interface CurrentUser {
    id : number | string,
    created_at : string,
    name : string,
    email : string,
    phone : string,
    userType : string,
}
export interface User { 
    id : number,
    name : string,
    email : string,
    phone : string,
    userType : string,
}

export interface AddUserInterface {
    name : string,
    email : string,
    password : string,
    phone : string,
    userType : string,
}

export interface ModifyUserInterface {
    name : string,
    email : string,
    phone : string,
    userType : string,
}


export type ApiResponseGetUserById = ApiResponseGet<User>
export type ApiResponseGetCurrentUser = ApiResponseGet<CurrentUser>
export type ApiResponseGetUsers = ApiResponseGet<User[]>