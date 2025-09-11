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
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AddProductInterface } from "@/services/types/products";
import { AddNewProduct } from "@/hooks/products/useProducts";
import React, { useContext, useEffect, useRef, useState } from "react";
import Inbox from '@/assets/inbox-icon.webp';
import toast from 'react-hot-toast';
import { TbPhotoEdit } from "react-icons/tb";
import { Package } from "lucide-react";
import { getAllCategories } from "@/hooks/categories/useCategories";
import { GoldPricesContext } from "@/context/GoldPrices";
import { useTranslation } from "react-i18next"; 

interface CategoryOption {
  id: number;
  name: string;
}

const AddProduct = () => {
  const { t } = useTranslation(); 
  const navigate = useNavigate();
  const { goldPrices } = useContext(GoldPricesContext);
  const { data: categories = [] } = getAllCategories();

  const categoryOptions: CategoryOption[] = categories.map(cat => ({
    id: cat.id,
    name: cat.name,
  }));

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
      karat: 24,
      productFile: null,
      categoryID: null,
      isFeatured: 0,
      quantity: null,
    },
  });
  const { errors } = formState;

  const { mutate: addNewProduct, isLoading, error, isSuccess } = AddNewProduct();

  const fileInput = useRef<HTMLInputElement>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);

  const clickFileInput = (e: React.MouseEvent) => {
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

  const deleteProductImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setValue('productFile', null);
    setProductImagePreview(null);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(t('products.messages.addSuccess')); // 👈 Translated
      reset();
      setProductImagePreview(null);
      navigate('/products');
    }
    if (error) {
      toast.error(t('products.messages.addError')); // 👈 Translated
    }
  }, [isSuccess, error, reset, navigate, t]);

  const onSubmit = (data: AddProductInterface) => {
    if (!data.productFile) {
      toast.error(t('products.form.imageRequired')); // 👈 Translated
      return;
    }

    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Description', data.description);

    if (data.weight) formData.append('Weight', String(data.weight));
    if (data.karat) formData.append('karat', String(data.karat));

    const itemKaratMatched = goldPrices.find((item) => item.karat == data.karat);
    const price = itemKaratMatched?.price;

    if (price) formData.append('price', String(price));
    if (data.quantity) formData.append('quantity', String(data.quantity));
    if (data.categoryID) formData.append('CategoryID', String(data.categoryID));

    formData.append('ProductFile', data.productFile);
    formData.append('IsFeatured', String(data.isFeatured));

    addNewProduct(formData);
  };

  const cancelAddProduct = () => {
    navigate('/products');
    reset();
    setProductImagePreview(null);
  };

  return (
    <div>
      {/* Header */}
      <Typography color="secondary" variant="h5" className="!mb-5 flex justify-start items-center gap-1">
        <Icon>
          <Package />
        </Icon>
        <span>{t('products.breadcrumb')}</span> {/* 👈 Translated */}
      </Typography>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3">
          {/* Featured Toggle */}
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
                        onChange={(_, newValue) => field.onChange(newValue ? 1 : 0)}
                        color="primary"
                      />
                    }
                    label={t('products.form.featured')} // 👈 Translated
                    labelPlacement="start"
                  />
                </FormGroup>
              )}
            />
          </div>

          {/* Product Name */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
              {t('products.form.name')}<span className="text-red-600">*</span>
            </label>
            <TextField
              placeholder={t('products.form.namePlaceholder')}
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: t('products.form.nameRequired'),
              })}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
              {t('products.form.description')}<span className="text-red-600">*</span>
            </label>
            <TextField
              placeholder={t('products.form.descriptionPlaceholder')}
              variant="outlined"
              multiline
              rows={3}
              fullWidth
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description', {
                required: t('products.form.descriptionRequired'),
              })}
            />
          </div>

          {/* Karat & Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Karat */}
            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">
                {t('products.form.karat')}<span className="text-red-600">*</span>
              </label>
              <Controller
                name="karat"
                control={control}
                rules={{ required: t('products.form.karatRequired') }}
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

            {/* Weight */}
            <div className="flex flex-col gap-2">
              <label className="text-secondary-main">
                {t('products.form.weight')}<span className="text-red-600">*</span>
              </label>
              <TextField
                type="number"
                placeholder={t('products.form.weightPlaceholder')}
                variant="outlined"
                fullWidth
                error={!!errors.weight}
                helperText={errors.weight?.message}
                {...register('weight', {
                  required: t('products.form.weightRequired'),
                  validate: v => Number(v) > 0 || t('products.form.weightInvalid'),
                })}
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
              {t('products.form.quantity')}<span className="text-red-600">*</span>
            </label>
            <TextField
              type="number"
              placeholder={t('products.form.quantityPlaceholder')}
              variant="outlined"
              fullWidth
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              {...register('quantity', {
                required: t('products.form.quantityRequired'),
                validate: v => Number(v) > 0 || t('products.form.quantityInvalid'),
              })}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
              {t('products.form.category')}<span className="text-red-600">*</span>
            </label>
            <Controller
              name="categoryID"
              control={control}
              rules={{ required: t('products.form.categoryRequired') }}
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
                      placeholder={t('products.form.selectCategory')}
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </div>

          {/* Product Image */}
          <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
              {t('products.form.image')}<span className="text-red-600">*</span>
            </label>
            <input
              className="hidden"
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={handleProductFileChange}
            />
            <div className="flex justify-center items-center !mt-3 !py-5 border-2 border-primary-main border-dashed rounded-xl">
              {productImagePreview ? (
                <div className="relative">
                  <img src={productImagePreview} width={200} alt={t('products.form.image')} />
                  <div className="absolute inset-0 w-full h-full opacity-0 hover:opacity-80 transition-opacity bg-black flex flex-col gap-4 justify-center items-center text-white">
                    <button className="cursor-pointer text-xl" onClick={deleteProductImage}>X</button>
                    <button className="cursor-pointer text-3xl" onClick={clickFileInput}>
                      <TbPhotoEdit />
                    </button>
                  </div>
                </div>
              ) : (
                <img src={Inbox} width={100} className="cursor-pointer" onClick={clickFileInput} alt={t('common.upload')} />
              )}
            </div>
            {errors.productFile && (
              <span className="text-red-500 text-[13px] !ms-3 !-mt-2">{errors.productFile.message}</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 !my-5">
            <Button type="submit" variant="contained" className="!text-white !capitalize">
              {isLoading ? <CircularProgress color="secondary" size={24} /> : t('common.add')}
            </Button>
            <Button variant="contained" color="error" sx={{ textTransform: 'capitalize' }} onClick={cancelAddProduct}>
              {t('common.cancel')}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;