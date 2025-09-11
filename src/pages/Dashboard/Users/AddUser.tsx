import { TextField , Button , CircularProgress , Select , MenuItem , Typography , Icon ,
      InputAdornment, IconButton,
} from "@mui/material";
import { useForm ,Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AddUserInterface } from "@/services/types/users";
import { AddNewUser } from "@/hooks/users/useUsers";
import { useEffect, useState } from "react";
import toast  from "react-hot-toast";
import { Users } from 'lucide-react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
// Translation
import { useTranslation } from "react-i18next";

const AddUser = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    
    // react hook form
    const { register , reset , handleSubmit , formState , control} = useForm<AddUserInterface>({
        mode : 'all',
        defaultValues : {
            name : '',
            email : '',
            password : '',
            phone : '',
            userType : 'user',
        }
    });
    const { errors } = formState;
    
    // react query
    const { mutate : addNewUser , isLoading , error , isSuccess } = AddNewUser();

    // handle finishing the request
    useEffect(() => {
            if(isSuccess) {
             toast.success(t('users.messages.addSuccess'));
                reset();
                navigate('/users');
            }
            if(error) {
                toast.error(t('users.messages.addError'));
            }
    },[isSuccess, error, t])

    // add
    function onSubmit (data : AddUserInterface) {
        addNewUser(data);
    }
    
    // cancel
    function cancelAddUser () {
        navigate('/users');
        reset();
    }

    return <div>
                {/* header  */}
        <Typography color="secondary" variant="h6" className="!mb-5 flex justify-start items-center gap-1">
          <Icon>
            <Users />
          </Icon>
          {t('users.breadcrumb')}
        </Typography>
            {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* user name */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
                {t('users.form.userName')}<span className="text-red-600">*</span>
            </label>
            <TextField 
            margin="normal"
            placeholder={t('users.form.userNamePlaceholder')}
            variant="outlined"
            {...register('name',{
                required : t('users.form.userNameRequired')
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            />
        </div>
        {/* user email*/}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
                {t('users.form.userEmail')}<span className="text-red-600">*</span>
            </label>
            <TextField 
            margin="normal"
            placeholder={t('users.form.userEmailPlaceholder')}
            variant="outlined"
            {...register('email',{
                required : t('users.form.userEmailRequired'),
                validate : (value : string) => {
                    return value.includes('@') || t('users.form.userEmailInvalid')
                }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            />
        </div>
        {/* user password */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
                {t('users.form.userPassword')}<span className="text-red-600">*</span>
            </label>
            <TextField
                className="!m-0"
              margin="normal"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              placeholder={t('users.form.userPasswordPlaceholder')}
              {...register('password', {
                required: t('users.form.userPasswordRequired'),
                validate: (value: string) => value.length >= 8 || t('users.form.userPasswordMinLength')
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              autoComplete='new-password'
            />
        </div>
        {/* user phone */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">
                {t('users.form.userPhone')}<span className="text-red-600">*</span>
            </label>
            <TextField 
            placeholder={t('users.form.userPhonePlaceholder')}
            variant="outlined"
            {...register('phone',{
                required : t('users.form.userPhoneRequired'),
                pattern : {
                    value: /^09\d{8}$/,
                     message: t('users.form.userPhoneInvalid'),
            },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            />
        </div>
        {/* user role */}
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
                        variant="outlined"
                        displayEmpty
                        error={!!errors.userType}
                    >
                        <MenuItem value="" disabled>{t('users.form.selectRole')}</MenuItem>
                        <MenuItem value="user">{t('users.roles.user')}</MenuItem>
                        <MenuItem value="product_manager">{t('users.roles.productManager')}</MenuItem>
                        <MenuItem value="admin">{t('users.roles.admin')}</MenuItem>
                    </Select>
                )}
        />
        </div>
        </div>
        {/* actions */}
            <div className="flex gap-3 !my-8">
                <Button type="submit" variant="contained" className="!text-white !capitalize">
                    {isLoading ? <CircularProgress color="secondary" size={24} /> : t('users.form.addButton')}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancelAddUser}>{t('common.cancel')}</Button>
            </div>
        </form>
    </div>
}
export default AddUser;