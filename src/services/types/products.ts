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
    weight : number ,
    price : number , 
    quantity : number ,
    productFile : string | File,
    // back-end named this property
    category_name : string ,
    smithing : number | null,
    categoryFile : string | File,
    isFeatured : boolean,
    categoryid : number,
}

// export interface AddCategoryInterface {
//     name : string,
//     description : string,
//     smithing : number,
//     categoryFile : File | null,
// }

export interface ModifyProductInterface {
    name : string,
    description : string,
    weight : number ,
    price : number , 
    quantity : number ,
    productFile : string | File,
    // back-end named this property
    category_name : string ,
    smithing : number | null,
    categoryFile : string | File,
    isFeatured : boolean,
    categoryId : number,
}

export type ApiResponseGetProductById = ApiResponseGet<Product>
export type ApiResponseGetProducts = ApiResponseGet<Product[]>