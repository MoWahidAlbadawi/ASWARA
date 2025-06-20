import type { ApiResponseGet  } from "./response";

export interface Category {
    id : number,
    name : string,
    description : string,
    smithing : number | null,
    categoryFile : string,
}

export interface AddCategoryInterface {
    name : string,
    description : string,
    smithing : number,
    categoryFile : File | null,
}

export type ApiResponseGetCategories = ApiResponseGet<Category[]>