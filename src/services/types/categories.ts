import type { ApiResponseGet  } from "./response";

export interface Category {

}

export interface AddCategoryInterface {
    name : string,
    description : string,
    categoryFile : File | null,
}

export type ApiResponseGetCategories = ApiResponseGet<Category[]>