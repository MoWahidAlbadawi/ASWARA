import { TextField, Button, CircularProgress, Typography, Icon, Select, MenuItem, FormControl, FormHelperText, LinearProgress } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { ModifyCategoryInterface } from "@/services/types/categories";
import { GetCategoryById, UpdateCategory } from "@/hooks/categories/useCategories";
import React, { useEffect, useRef, useState } from "react";
import Err404 from "@/pages/Errors/Err404";
import Inbox from '@/assets/inbox-icon.webp';
import toast from 'react-hot-toast';
import { TbPhotoEdit } from "react-icons/tb";
import { TbCategoryFilled } from "react-icons/tb";
import { useTranslation } from "react-i18next"; // 👈 Added

const ModifyCategory = () => {
    const { t } = useTranslation(); // 👈 Initialize translation
    const { categoryId } = useParams();
    const navigate = useNavigate();

    const { register, reset, handleSubmit, formState, setValue, control } = useForm<ModifyCategoryInterface>({
        mode: 'all',
    });
    const { errors } = formState;

    const { data: categoryInfo, isLoading: isLoadingGet, error: errorGet } = GetCategoryById(categoryId ?? '');
    const { mutate: update, isLoading: isLoadingSet, error: errorSet, isSuccess: isSuccessSet } = UpdateCategory(categoryId ?? '');

    const fileInput = useRef<HTMLInputElement>(null);
    const [categoryImagePreview, setCategoryImagePreview] = useState<string | null>(null);

    function clickFileInput(e: React.MouseEvent) {
        e.preventDefault();
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    function handleCategoryFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setValue('categoryFile', file);
            setCategoryImagePreview(URL.createObjectURL(file));
        }
    }

    function deleteCategoryImage(e: React.MouseEvent) {
        e.preventDefault();
        setValue('categoryFile', null);
        setCategoryImagePreview(null);
    }

    useEffect(() => {
        if (categoryInfo) {
            reset({
                name: categoryInfo.name,
                description: categoryInfo.description,
                smithing: categoryInfo.smithing,
                categoryFile: categoryInfo.categoryFile,
            });
            setCategoryImagePreview(categoryInfo.categoryFile?.toString() || null);
        }
    }, [categoryInfo]);

    const smithingOptions = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    useEffect(() => {
        const controller = new AbortController();
        if (isSuccessSet) {
            toast.success(t('categories.messages.editSuccess')); // 👈 Translated
            setTimeout(() => {
                navigate('/categories');
            }, 2000);
        }
        if (errorSet) {
            toast.error(t('categories.messages.editError')); // 👈 Translated
        }
        return () => {
            controller.abort();
        };
    }, [isSuccessSet, errorSet, t, navigate]);

    function onSubmit(data: ModifyCategoryInterface) {
        if (!data.categoryFile) {
            toast.error(t('categories.form.imageRequired')); // 👈 Translated
            return;
        }
        const formData = new FormData();
        formData.append('Name', data.name);
        formData.append('Description', data.description);
        formData.append('smithing', String(data.smithing));
        if (data.categoryFile instanceof File) {
            formData.append('CategoryFile', data.categoryFile);
        }
        update(formData);
    }

    function cancel() {
        navigate('/categories');
        reset();
        setCategoryImagePreview(null);
    }

    if (errorGet) {
        return <Err404 />;
    }

    return (
        <div>
            {/* Header */}
            <Typography color='secondary' variant="h5" className="!mb-5 flex justify-start items-center gap-1">
                <Icon><TbCategoryFilled /></Icon>
                <span>{t('categories.modifyBreadcrumb')}</span> {/* 👈 Translated */}
            </Typography>

            {/* Form */}
            {isLoadingGet ? (
                <LinearProgress color="primary" />
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Name & Smithing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Category Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary-main">
                                    {t('categories.form.categoryName')}<span className="text-red-600">*</span>
                                </label>
                                <TextField
                                    placeholder={t('categories.form.categoryNamePlaceholder')}
                                    variant="outlined"
                                    {...register('name', {
                                        required: t('categories.form.categoryNameRequired'),
                                    })}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            </div>

                            {/* Smithing */}
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary-main">
                                    {t('categories.form.smithingValue')}<span className="text-red-600">*</span>
                                </label>
                                <Controller
                                    name="smithing"
                                    control={control}
                                    rules={{ required: t('categories.form.smithingRequired') }}
                                    render={({ field, fieldState }) => (
                                        <FormControl fullWidth error={!!fieldState.error}>
                                            <Select
                                                {...field}
                                                value={field.value || 24}
                                                displayEmpty
                                                variant="outlined"
                                            >
                                                {smithingOptions.map((item: number) => (
                                                    <MenuItem key={item} value={item}>
                                                        {item} %
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {fieldState.error && (
                                                <FormHelperText>{fieldState.error.message}</FormHelperText>
                                            )}
                                        </FormControl>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">
                                {t('categories.form.categoryDescription')}<span className="text-red-600">*</span>
                            </label>
                            <TextField
                                placeholder={t('categories.form.categoryDescriptionPlaceholder')}
                                variant="outlined"
                                {...register('description', {
                                    required: t('categories.form.categoryDescriptionRequired'),
                                })}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">
                                {t('categories.form.categoryImage')}<span className="text-red-600">*</span>
                            </label>
                            <input
                                className="hidden"
                                ref={fileInput}
                                type="file"
                                accept="image/*"
                                onChange={handleCategoryFileChange}
                            />
                            <div className="flex justify-center items-center !mt-3 !py-5 border-2 border-primary-main border-dashed rounded-xl">
                                {categoryImagePreview ? (
                                    <div className="relative">
                                        <img src={categoryImagePreview} width={200} alt={t('categories.form.categoryImage')} />
                                        <div className="absolute inset-0 w-full h-full opacity-0 hover:opacity-80 transition-opacity bg-black flex flex-col gap-4 justify-center items-center text-white">
                                            <button className="cursor-pointer text-xl" onClick={deleteCategoryImage}>X</button>
                                            <button className="cursor-pointer text-3xl" onClick={clickFileInput}>
                                                <TbPhotoEdit />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <img src={Inbox} width={100} className="cursor-pointer" onClick={clickFileInput} alt={t('common.upload')} />
                                )}
                            </div>
                            {errors.categoryFile && (
                                <span className="text-red-500 text-[13px] !ms-3 !-mt-2">{errors.categoryFile.message}</span>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 !my-8">
                        <Button type="submit" variant="contained" className="!text-white !capitalize">
                            {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : t('common.save')}
                        </Button>
                        <Button variant="contained" color='error' sx={{ textTransform: 'capitalize' }} onClick={cancel}>
                            {t('common.cancel')}
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default ModifyCategory;