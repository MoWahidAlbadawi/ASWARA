import type { ApiResponseGet  } from "./response";
export class filtersCategoryDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    smithingValue : number = 0;
}

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