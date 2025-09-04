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
  Select ,
  FormControl,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// product
import type { AddProductInterface } from "@/services/types/products";
import { AddNewProduct } from "@/hooks/products/useProducts";
// import { useCategories } from "@/hooks/categories/useCategories"; // You need this
import React, { useContext, useEffect, useRef, useState } from "react";
// assets
import Inbox from '@/assets/inbox-icon.png';
// toast
import toast from 'react-hot-toast';
// icons
import { TbPhotoEdit } from "react-icons/tb";
import {  Package } from "lucide-react"
import { getAllCategories } from "@/hooks/categories/useCategories";
import { GoldPricesContext } from "@/context/GoldPrices";
// import { BsPercent } from "react-icons/bs";

// // Interface for category option in autocomplete
interface CategoryOption {
  id: number;
  name: string;
}

const AddProduct = () => {
  const navigate = useNavigate();
  // gold prices from context
  const { goldPrices } = useContext(GoldPricesContext);
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
  } = useForm<AddProductInterface>({
    mode: 'all',
    defaultValues: {
      name: '',
      description: '',
      weight: null,
      price: null,
      karat : 24,
      productFile: null,
      categoryID: null,
      isFeatured: 0,
      quantity: null,
    },
  });
  const { errors } = formState;

  // react-query
  const { mutate: addNewProduct, isLoading, error, isSuccess } = AddNewProduct();

  // Image upload state and refs
  const fileInput = useRef<HTMLInputElement>(null);
  const [productImagePreview, setproductImagePreview] = useState<string | null>(null);

  // Handlers
  const clickFileInput = (e : React.MouseEvent) => {
    e.preventDefault();
    fileInput.current?.click();
  };

  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('productFile', file);
      setproductImagePreview(URL.createObjectURL(file));
    }
  };

  const deleteProductImage = (e : React.MouseEvent) => {
    e.preventDefault();
    setValue('productFile', null);
    setproductImagePreview(null);
  };

  // Handle success/error
  useEffect(() => {
    if (isSuccess) {
      toast.success('The product was added successfully');
      reset();
      setproductImagePreview(null);
        navigate('/products');
    }
    if (error) {
      toast.error('An error occurred while adding the product');
    }
  }, [isSuccess, error, reset, navigate]);

  // Submit handler
  const onSubmit = (data: AddProductInterface) => {
    if (!data.productFile) {
      toast.error('Product image is required');
      return;
    }

    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);

    if (data.weight) formData.append('Weight', String(data.weight));
    if (data.karat) formData.append('Karat', String(data.karat));

    const itemKaratMatched = goldPrices.find((item) => item.karat == data.karat);
    const price = itemKaratMatched?.price;
     
    if (price) formData.append('Price', String(price));
    if (data.quantity) formData.append('Quantity', String(data.quantity));
    if (data.categoryID) formData.append('CategoryID', String(data.categoryID));

    formData.append('ProductFile', data.productFile);
    formData.append('IsFeatured', String(data.isFeatured));

    addNewProduct(formData);
  };

  const cancelAddProduct = () => {
    navigate('/products');
    reset();
    setproductImagePreview(null);
  };


  return (
    <div>
      {/* Header */}
      <Typography color="secondary" variant="h5" className="!mb-5 flex justify-start items-center gap-1">
        <Icon>
          <Package />
        </Icon>
        <span>Products / Add Product</span>
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
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

          {/* Karat & Weight */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* FIXED KARAT SELECT */}
            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">Karat<span className="text-red-600">*</span></label>
              <Controller
                name="karat"
                control={control}
                rules={{ required: 'Karat is required' }}
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <Select
                      {...field}
                      value={field.value || 24}
                      displayEmpty
                      variant="outlined"
                    >
                      <MenuItem value={18}>18K</MenuItem>
                      <MenuItem value={21}>21K</MenuItem>
                      <MenuItem value={24}>24K</MenuItem>
                    </Select>
                    {fieldState.error && (
                      <FormHelperText>{fieldState.error.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
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
                    {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Add'}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancelAddProduct}>Cancel</Button>
            </div>
            </div>
      </form>
    </div>
  );
};
export default AddProduct;