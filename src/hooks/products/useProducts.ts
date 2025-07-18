import { useQuery , useMutation} from "react-query";
import type { ApiResponseGetProducts , ApiResponseGetProductById } from "@/services/types/products";
import api from "@/services/axios"
import { PRODUCTS , PRODUCT , ADD_PRODUCT, DELETE_PRODUCT, MODIFY_PRODUCT} from  "@/services/endpoints"

// get all products
export const GetAllProducts = () => {
    return useQuery('products',() => {
        return api.get<ApiResponseGetProducts>(`/${PRODUCTS}`).then(res => res.data.data);  
    })
}

// add product
export const AddNewProduct = () => {
    return useMutation(((data : FormData) => {
    return api.post(`/${ADD_PRODUCT}`,data);
    }));
}

// get product by id 
export const GetProductById = (id : (number | string)) => {
    return useQuery('product-by-id',() => {
        return api.get<ApiResponseGetProductById>(`/${PRODUCT}/${id}`).then(res => res.data.data);
    })
}
// modify product
export const UpdateProduct = (id : number | string) => {
    return useMutation('modify-product',(data : FormData) => {
        return api.put(`/${MODIFY_PRODUCT}/${id}`,data);
    });
}

// delete product
export const DeleteProduct = () => {
    return useMutation('delete-product',(id : number) => {
        return api.post(`/${DELETE_PRODUCT}/${id}`);
    });
}