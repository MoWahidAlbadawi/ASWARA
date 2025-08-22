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
    smithing : number | string,
    categoryFile : string | File,
}

export interface AddCategoryInterface {
    name : string,
    description : string,
    smithing : number | string,
    categoryFile : string | File | null,
}

export type ModifyCategoryInterface = AddCategoryInterface;

export type ApiResponseGetCategoryById = ApiResponseGet<Category>
export type ApiResponseGetCategories = ApiResponseGet<Category[]>