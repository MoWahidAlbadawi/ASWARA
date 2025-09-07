import type { ApiResponseGet  } from "./response";
export class filtersProductDto {
    searchTerm : string = '';
    pageSize : number = 8;
    pageIndex : number = 1;
    categoryId : number = 0;
}

export interface Product {
    id : number,
    name : string,
    // back-end forget s 
    decription : string,
    price : number , 
    quantity : number ,
    productFile : string | File,
    // back-end named this property
    category_name : string ,
    smithing : number | null,
    categoryFile : string | File,
    isFeatured : 1 | 0,
    categoryid : number,
    karat : 18 | 21 | 24;
}

export interface AddProductInterface {
    name : string,
    description : string,
    weight : number | string | null;
    price : number | string | null;
    productFile : File | string | null;
    categoryID : number | string | null;
    isFeatured : 0 | 1;
    quantity : number | string | null;
    karat : 18 | 21 | 24;
}

export type LocalProduct = {
    name : string,
    price : number,
    karat : 18 | 21 | 24,
    weight : number,
    quantity : number,  
  }

export type ModifyProductInterface = AddProductInterface;

export type ApiResponseGetProductById = ApiResponseGet<Product>
export type ApiResponseGetProducts = ApiResponseGet<Product[]>