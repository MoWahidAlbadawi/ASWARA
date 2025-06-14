import type { ApiResponseGet } from "./response"

export interface CurrentUser {
    userID : number,
    created_at : string,
    name : string,
    email : string,
    phone : string,
    userType : string,
}
export interface GetUser { 
    UserID : number,
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

export type ApiResponseGetCurrentUser = ApiResponseGet<CurrentUser>
export type ApiResponseGetUsers = ApiResponseGet<GetUser[]>