import { useMutation , useQuery} from "react-query";
import api from "@/services/axios"
import { ADD_CATEGORY, CATEGORIES, CATEGORY, DELETE_CATEGORY, MODIFY_Category } from  "@/services/endpoints"
import type { ApiResponseGetCategories , ApiResponseGetCategoryById } from "@/services/types/categories";

// get all categories
export const getAllCategories = () => {
    return useQuery('categories',() => {
        return api.get<ApiResponseGetCategories>(`/${CATEGORIES}`).then(res => res.data.data);  
    })
}

// add category 
export const AddNewCategory = () => {
    return useMutation(((data : FormData) => {
    return api.post(`/${ADD_CATEGORY}`,data);
    } ),{
         onSuccess : (data : any ) => {
            console.log('category added successfully!',data);   
        },
        onError : (err : any) => {
            console.log(err,'error on Add new category');
        } 
    });
}

// get by id category
export const GetCategoryById = (id : number | string) => {
    return useQuery('category-by-id',() => {
        return api.get<ApiResponseGetCategoryById>(`/${CATEGORY}/${id}`).then(res => res.data.data);
    })
}

// modify category
export const UpdateCategory = (id : number | string) => {
    return useMutation('modify-category',(data : FormData) => {
        return api.post(`/${MODIFY_Category}/${id}`,data);
    });
}


// delete category
export const DeleteCategory = () => {
    return useMutation('delete-category',(id : number) => {
        return api.post(`/${DELETE_CATEGORY}/${id}`);
    })
} 