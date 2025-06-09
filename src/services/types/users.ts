export interface CurrentUser {
    userID : number,
    created_at : string,
    name : string,
    email : string,
    phone : string,
    userType : string,
}

export type ApiResponseGetCurrentUser = ApiResponseGet<CurrentUser>

type ApiResponseGet<T> = {
        msg? : string,
        data : T
}