import { TextField , Button , CircularProgress , LinearProgress , Select , MenuItem , Typography , Icon} from "@mui/material";
import { useForm ,Controller} from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { ModifyUserInterface } from "@/services/types/users";
import { GetUserById, UpdateUser } from "@/hooks/users/useUsers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Err404 from "@/pages/Errors/Err404";
import { Users } from 'lucide-react';
// Translation
import { useTranslation } from "react-i18next";

const ModifyUser = () => {
    const { t } = useTranslation();
    const { userId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    
    const isProfileMode = searchParams.get('profileMode') === 'true';

    // react hook form
    const { register , reset , handleSubmit , formState , control} = useForm<ModifyUserInterface>({
        mode : 'all'
    });
    const { errors } = formState;

    // react query
    const { data : userInfo , isLoading : isLoadingGet , error : errorGet} = GetUserById(userId ?? '');
    const { mutate : modify , isLoading : isLoadingSet , error : errorSet , isSuccess : isSuccessSet } = UpdateUser(userId ?? '');

    useEffect(() => {
        if(userInfo) {
            reset({
              name : userInfo.name,
              email : userInfo.email,
              userType : userInfo.userType,
              phone : userInfo.phone,
            });
        }
    },[userInfo])

    // handle finishing the request
    useEffect(() => {
        const controller = new AbortController();
        if(isSuccessSet) {
            toast.success(isProfileMode ? t('profile.messages.updateSuccess') : t('users.messages.editSuccess'));
            reset();
            setTimeout(() => {
                // You can modify the navigation based on the `isProfileMode`
                // For example: if (isProfileMode) { navigate('/profile'); } else { navigate('/users'); }
                navigate('/users');
            }, 2000);
        }
        if(errorSet) {
            toast.error(isProfileMode ? t('profile.messages.updateError') : t('users.messages.editError'));
        }
        return () => {
            controller.abort();
        }
    },[isSuccessSet, errorSet, isProfileMode, t])

    // add
    function onSubmit (data : ModifyUserInterface) {
        modify(data);
    }

    // cancel
    function cancelAddUser () {
        navigate('/users');
        reset();
    }

    // user id not found
    if(errorGet) {
        return <Err404 />
    }
    
    // Now you can use the `isProfileMode` variable to conditionally render or change logic
    // For example, changing the header text or disabling certain fields.
    const pageTitle = isProfileMode ? t('profile.breadcrumb') : t('users.modifyBreadcrumb');

    return (
        <div>
            {/* header */}
            <Typography color="secondary" variant="h6" className="!mb-5 flex justify-start items-center gap-1">
                <Icon><Users /></Icon>
                {pageTitle}
            </Typography>
            {/* form */}
            {isLoadingGet ? 
                <LinearProgress color="primary" /> : 
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* fields */}
                    <div className={isProfileMode ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                        {/* user name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">
                                {isProfileMode ? t('profile.form.name') : t('users.form.userName')}
                                <span className="text-red-600">*</span>
                            </label>
                            <TextField 
                                placeholder={isProfileMode ? t('profile.form.namePlaceholder') : t('users.form.userNamePlaceholder')}
                                variant="outlined"
                                {...register('name',{
                                    required : isProfileMode ? t('profile.form.nameRequired') : t('users.form.userNameRequired')
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </div>
                        {/* user email*/}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">
                                {isProfileMode ? t('profile.form.email') : t('users.form.userEmail')}
                                <span className="text-red-600">*</span>
                            </label>
                            <TextField 
                                placeholder={isProfileMode ? t('profile.form.emailPlaceholder') : t('users.form.userEmailPlaceholder')}
                                variant="outlined"
                                {...register('email',{
                                    required : isProfileMode ? t('profile.form.emailRequired') : t('users.form.userEmailRequired'),
                                    validate : (value : string) => {
                                        return value.includes('@') || (isProfileMode ? t('profile.form.emailInvalid') : t('users.form.userEmailInvalid'))
                                    }   
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </div>
                        {/* user phone */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">
                                {isProfileMode ? t('profile.form.phone') : t('users.form.userPhone')}
                                <span className="text-red-600">*</span>
                            </label>
                            <TextField 
                                placeholder={isProfileMode ? t('profile.form.phonePlaceholder') : t('users.form.userPhonePlaceholder')}
                                variant="outlined"
                                {...register('phone',{
                                    required : isProfileMode ? t('profile.form.phoneRequired') : t('users.form.userPhoneRequired'),
                                    pattern : {
                                        value: /^09\d{8}$/,
                                        message: isProfileMode ? t('profile.form.phoneInvalid') : t('users.form.userPhoneInvalid'),
                                    },
                                })}
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                            />
                        </div>
                        {/* user role */}
                        {/* You could conditionally hide this field if isProfileMode is true */}
                        {isProfileMode ? null : (
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary-main">
                                    {t('users.form.userRole')}<span className="text-red-600">*</span>
                                </label>
                                <Controller
                                    name="userType"
                                    control={control}
                                    rules={{ required: t('users.form.userRoleRequired') }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            value={field.value ?? ""}
                                            variant="outlined"
                                            displayEmpty
                                            error={!!errors.userType}
                                        >
                                            <MenuItem value="user">{t('users.roles.user')}</MenuItem>
                                            <MenuItem value="product_manager">{t('users.roles.productManager')}</MenuItem>
                                            <MenuItem value="admin">{t('users.roles.admin')}</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    {/* actions */}
                    <div className="flex gap-3 !my-8">
                        <Button type="submit" variant="contained" className="!text-white !capitalize">
                            {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : t('common.save')}
                        </Button>
                        <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}} onClick={cancelAddUser}>
                            {t('common.cancel')}
                        </Button>
                    </div>
                </form>
            }
        </div>
    );
}

export default ModifyUser;