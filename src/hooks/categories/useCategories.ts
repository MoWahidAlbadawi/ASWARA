import { useMutation , useQuery} from "react-query";
import api from "@/services/axios"
import { ADD_CATEGORY, CATEGORIES, DELETE_CATEGORY } from  "@/services/endpoints"
import type { ApiResponseGetCategories } from "@/services/types/categories";

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


// modify category

// delete category
export const DeleteCategory = () => {
    return useMutation('delete-category',(id : number) => {
        return api.post(`/${DELETE_CATEGORY}/${id}`);
    })
} 