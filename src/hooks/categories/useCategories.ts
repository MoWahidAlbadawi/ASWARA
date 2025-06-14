import { useMutation} from "react-query";
import api from "@/services/axios"
import { ADD_CATEGORY } from  "@/services/endpoints"

// get all categories
// export const getAllCategories = () => {
//     return useQuery('users',() => {
//         return api.get<ApiResponseGetUsers>(`/${USERS}`).then(res => res.data.data);  
//     })
// }

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
