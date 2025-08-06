import { TextField , Button , CircularProgress , Typography , Icon, InputAdornment
    , LinearProgress
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// category
import type { ModifyCategoryInterface } from "@/services/types/categories";
import { GetCategoryById, UpdateCategory } from "@/hooks/categories/useCategories";
import React, { useEffect, useRef, useState } from "react";
// 404 page
import Err404 from "@/pages/Errors/Err404";
// uploader photo
import Inbox from '@/assets/inbox-icon.png'
// toast
import toast from 'react-hot-toast';
// icons
import { TbPhotoEdit } from "react-icons/tb";
import { TbCategoryFilled } from "react-icons/tb";
import { BsPercent } from "react-icons/bs";

const ModifyCategory = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    // react hook form
    const { register , reset , handleSubmit , formState , setValue } = useForm<ModifyCategoryInterface>({
        mode : 'all',
    });
    const { errors } = formState;
    // react query
    const { data : categoryInfo , isLoading : isLoadingGet , error : errorGet } = GetCategoryById(categoryId ?? '');
    const { mutate : update , isLoading : isLoadingSet , error : errorSet , isSuccess : isSuccessSet} = UpdateCategory(categoryId ?? '');
    // Image refs and states and fns
    const fileInput = useRef<HTMLInputElement>(null);
    const [categoryImagePreview , setCategoryImagePreview] = useState<string | null>(null);

    function clickFileInput (e : React.MouseEvent) {
        e.preventDefault();
        if(fileInput.current) {
            fileInput.current.click();
        }   
    }
    function hanldeCategoryFileChange (e : React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if(file) {
            setValue('categoryFile',file);
            setCategoryImagePreview(URL.createObjectURL(file));
        }
    }
    function deleteCategoryImage (e : React.MouseEvent) {
        e.preventDefault();
        setValue('categoryFile',null);
        setCategoryImagePreview(null);
    }

    // react hook form saving the previous values so it is show them until it get the new data
    // i reset data each categegoryId change
    // so it is reset the form then get the data reset with new real values
        useEffect(() => {
        reset();
        setCategoryImagePreview(null); 
        }, [categoryId]);

        useEffect(() => {
        if(categoryInfo) {
            reset({
              name : categoryInfo.name,
              description : categoryInfo.description,
              smithing : categoryInfo.smithing,
              categoryFile : categoryInfo.categoryFile,
            });
            setCategoryImagePreview(categoryInfo.categoryFile.toString());
        }
    },[categoryInfo])

    // handle finishing the request
    useEffect(() => {
            const controller = new AbortController();
            if(isSuccessSet) {
             toast.success('the category updated successfully');
                reset();
                setTimeout(() => {
                navigate('/aswaraDashboard/categories');
                },2000);    
            }
            if(errorSet) {
                toast.error('error happens while updating category');
            }
            return () => {
                controller.abort();
            }
    },[isSuccessSet,errorSet])


    // add
    function onSubmit (data : ModifyCategoryInterface) {
        if(!data.categoryFile) {
            toast.error('category file image is required');
            return;
        }
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('smithing', String(data.smithing));
        // back-end tell me send categoryFile just if it changed ..!
        if (data.categoryFile instanceof File) {
            formData.append('CategoryFile', data.categoryFile);
    }
        update(formData);
        reset();
         }

    // cancel
    function cancel () {
        navigate('/aswaraDashboard/categories');
        reset();
        setCategoryImagePreview(null);
}
        // category id not found
        if(errorGet) {
            return <Err404 />
        }

    return <div>        
            {/* header  */}
           <Typography color='secondary' variant="h5" className="!mb-5 flex justify-start items-center gap-1">
                <Icon><TbCategoryFilled/></Icon> 
                <span>Categories / Modify Category</span>
                </Typography>
            {/* form */}
        {isLoadingGet ? 
         <LinearProgress color="primary" /> : 
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* fields */}
            <div className="grid grid-cols-1 gap-3">
        {/* category name & simithing*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* category name */} 
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Category Name</label>
            <TextField 
            placeholder="Enter category name"
            variant="outlined"
            {...register('name',{
                required : 'category name is reqiured'
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            />
        </div>
                {/* smithing */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Smithing Value</label>
            <TextField
            placeholder="Enter smithing value"
            variant="outlined"
            type="number"
            {...register('smithing',{
                required : 'smithing value is reqiured',
                validate : (value) => {
                    if(value) {
                    return value > 0 || 'smithing must be at least 1'
                }
            }
            })}
            error={!!errors.smithing}
            helperText={errors.smithing?.message}
            InputProps={{
                startAdornment : (
                    <InputAdornment position="start">
                        <Icon className="text-gray-700"><BsPercent /></Icon>
                    </InputAdornment>
                )
            }}
            />
        </div>
        </div>
        {/* category description */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Category Description</label>
            <TextField
            placeholder="Enter category description"
            variant="outlined"
            {...register('description',{
                required : 'category description is reqiured'
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            />
        </div>
            {/* category file */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Category Image</label>
            <input 
            className="hidden"
            ref={fileInput}
            type="file"
            accept="image/*"
            onChange={hanldeCategoryFileChange}
            />
            {/* uploader */}
            <div className="flex justify-center items-center !mt-3 !py-5 border-2 border-primary-main border-dashed rounded-xl">
                {categoryImagePreview ? <div className="relative"> <img src={categoryImagePreview} width={200} /> 
                <div className="absolute inset-0 w-full h-full opacity-0 hover:opacity-80 transition-opacity transition-300 ease-in-out bg-black flex flex-col gap-4 justify-center items-center text-white">
                    <button className="cursor-pointer text-xl" onClick={deleteCategoryImage}>X</button>
                    <button className="cursor-pointer text-3xl" onClick={clickFileInput}><TbPhotoEdit /></button>
                </div>
                </div> :
                 <img src={Inbox} width={100} className="cursor-pointer" onClick={clickFileInput}/>}
            </div>
            {errors.categoryFile && (
                <span className="text-red-500 text-[13px] !ms-3 !-mt-2">{errors.categoryFile.message}</span>
            )}
            </div>
        </div>
        {/* actions */}
            <div className="flex gap-3 !my-8">
                <Button type="submit" variant="contained" className="!text-white !capitalize">
                    {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : 'Save'}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancel}>Cancel</Button>
            </div>
        </form>}
    </div>
}
export default ModifyCategory;