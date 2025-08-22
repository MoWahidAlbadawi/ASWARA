import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Icon,
  Switch,
  FormGroup,
  FormControlLabel,
  Autocomplete,
  LinearProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// product
import type { ModifyProductInterface } from "@/services/types/products";
import { GetProductById, UpdateProduct } from "@/hooks/products/useProducts";
// import { useCategories } from "@/hooks/categories/useCategories"; // You need this
import React, { useEffect, useRef, useState } from "react";
// assets
import Inbox from '@/assets/inbox-icon.png';
// toast
import toast from 'react-hot-toast';
// icons
import { TbPhotoEdit } from "react-icons/tb";
import { Package } from "lucide-react";
// import { BsPercent } from "react-icons/bs";
// get all
import { getAllCategories } from "@/hooks/categories/useCategories";
// 404 not found page
import Err404 from "@/pages/Errors/Err404";
// // Interface for category option in autocomplete
interface CategoryOption {
  id: number;
  name: string;
}

const ModifyProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // Fetch categories for autocomplete
  const { data: categories = [] } = getAllCategories();

  // Transform to options
  const categoryOptions: CategoryOption[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
  }));

  // react-hook-form setup
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState,
    setValue,
  } = useForm<ModifyProductInterface>({
    mode: 'all',
  });
  const { errors } = formState;

  // react-query
  const { data : productInfo ,  isLoading : isLoadingGet , error : errorGet } = GetProductById(productId ?? '');
  const { mutate : update , isLoading : isLoadingSet , error : errorSet , isSuccess : isSuccessSet} = UpdateProduct(productId ?? '');

  // Image upload state and refs
  const fileInput = useRef<HTMLInputElement>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);

  // Handlers
  const clickFileInput = (e : React.MouseEvent) => {
    e.preventDefault();
    fileInput.current?.click();
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('productFile', file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const deleteProductImage = (e : React.MouseEvent) => {
    e.preventDefault();
    setValue('productFile', null);
    setProductImagePreview(null);
  }
          useEffect(() => {
          if(productInfo) {
              reset({
                  name: productInfo.name,
                  description: productInfo.decription,
                  weight: productInfo.weight,
                  price: productInfo.price,
                  productFile: productInfo.productFile,
                  categoryID: productInfo.categoryid,
                  isFeatured : productInfo.isFeatured,
                  quantity: productInfo.quantity,
              });
              setProductImagePreview(productInfo.productFile.toString());
          }
      },[productInfo])
  

  // Handle success/error
  useEffect(() => {
    if (isSuccessSet) {
      toast.success('The product was added successfully');
      setProductImagePreview(null);
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    }
    if (errorSet) {
      toast.error('An error occurred while adding the product');
    }
  }, [isSuccessSet, errorSet, reset, navigate]);

  // Submit handler
  const onSubmit = (data: ModifyProductInterface) => {
    if (!data.productFile) {
      toast.error('Product image is required');
      return;
    }

    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);

    if (data.weight) formData.append('Weight', String(data.weight));
    if (data.price) formData.append('Price', String(data.price));
    if (data.quantity) formData.append('quantity', String(data.quantity));
    if (data.categoryID) formData.append('CategoryID', String(data.categoryID));

        formData.append('IsFeatured', String(data.isFeatured));

      if (data.productFile instanceof File) {
        formData.append('ProductFile', data.productFile);
      }

    update(formData);
  };

  const cancelModifyProduct = () => {
    navigate('/products');
    reset();
    setProductImagePreview(null);
  };

      // Product id not found
        if(errorGet) {
            return <Err404 />
        }
    return (
    <div>        
            {/* header  */}
           <Typography color='secondary' variant="h5" className="!mb-5 flex justify-start items-center gap-1">
                <Icon><Package /></Icon> 
                <span>Products / Modify Product</span>
                </Typography>
            {/* form */}
        {isLoadingGet ? 
         <LinearProgress color="primary" /> : 
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* fields */}
        <div className="grid grid-cols-1 gap-3">
          {/* Product Name */}
          <div className="flex justify-end items-center !m-0">
        <Controller
          name="isFeatured"
          control={control}
          render={({ field }) => (
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={field.value === 1} 
                    onChange={(_,newValue) => field.onChange(newValue ? 1 : 0)}
                    color="primary"
                  />
                }
                label="Featured Product"
                labelPlacement="start"
              />
            </FormGroup>
          )}
        />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Product Name<span className="text-red-600">*</span></label>
            <TextField
              placeholder="Enter product name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Product name is required',
              })}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Description<span className="text-red-600">*</span></label>
            <TextField
              placeholder="Enter product description"
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description', {
                required: 'Description is required',
              })}
            />
          </div>

          {/* Price & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">Price<span className="text-red-600">*</span></label>
              <TextField
                type="number"
                placeholder="Enter price"
                variant="outlined"
                fullWidth
                error={!!errors.price}
                helperText={errors.price?.message}
                {...register('price', {
                  required: 'Price is required',
                   validate: v => Number(v) > 0 || 'price must be greater than 0',
                })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">Weight (g)<span className="text-red-600">*</span></label>
              <TextField
                type="number"
                placeholder="Enter weight"  
                variant="outlined"
                fullWidth
                error={!!errors.weight}
                helperText={errors.weight?.message}
                {...register('weight', {
                 required : 'weight is required',
                validate: v => Number(v) > 0 || 'weight must be greater than 0',
                })}
              />
            </div>
          </div>

          {/* Quantity & IsFeatured */}
            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">Quantity<span className="text-red-600">*</span></label>
              <TextField
                type="number"
                placeholder="Enter quantity"
                variant="outlined"
                fullWidth
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                {...register('quantity', {
                    required : 'quantity is required',
                  validate: v => Number(v) >= 0 || 'quantity must be positive',
                })}
              />
            </div>

          {/* Category Autocomplete  */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Category<span className="text-red-600">*</span></label>
            <Controller
              name="categoryID"
              control={control}
              rules={{ required: 'Category is required' }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={categoryOptions}
                  getOptionLabel={option => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value?.id}
                  value={categoryOptions.find(opt => opt.id === field.value) || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue?.id || null);
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Select a category"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Product Image Uploader */}
                    <div className="flex flex-col gap-2">
            <label className="text-secondary-main">Product Image<span className="text-red-600">*</span></label>
            <input 
            className="hidden"
            ref={fileInput}
            type="file"
            accept="image/*"  
            onChange={handleProductFileChange}
            />
            <div className="flex justify-center items-center !mt-3 !py-5 border-2 border-primary-main border-dashed rounded-xl">
                {productImagePreview ? <div className="relative"> <img src={productImagePreview} width={200} /> 
                <div className="absolute inset-0 w-full h-full opacity-0 hover:opacity-80 transition-opacity transition-300 ease-in-out bg-black flex flex-col gap-4 justify-center items-center text-white">
                    <button className="cursor-pointer text-xl" onClick={deleteProductImage}>X</button>
                    <button className="cursor-pointer text-3xl" onClick={clickFileInput}><TbPhotoEdit /></button>
                </div>
                </div> :
                 <img src={Inbox} width={100} className="cursor-pointer" onClick={clickFileInput}/>}
            </div>
            </div>
        {/* Actions */}
            <div className="flex gap-3 !my-5">
                <Button type="submit" variant="contained" className="!text-white !capitalize">
                    {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : 'Save'}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancelModifyProduct}>Cancel</Button>
            </div>
            </div>
      </form>}
    </div>
            );
}
export default ModifyProduct;