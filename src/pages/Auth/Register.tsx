// router
import { Link } from 'react-router-dom';
//auth image
import Jewelry_Image from '@/assets/Jewelry_Auth.webp';
// logo
import logo from '@/assets/Logo.webp'
// use from to handle form with react-hook-form
  import { useForm } from 'react-hook-form';
  // components from mui
  import {
    Button,
    TextField,
    Typography,
    Container,
    InputAdornment,
    IconButton,
    CircularProgress,
    Alert
  } from '@mui/material';
  // icons
  import { FaEye , FaEyeSlash } from "react-icons/fa6";
  // interfaces 
  import { type RegisterData } from '@/services/types/Auth';
  // from react
  import { useState , useEffect} from 'react';
import { useRegister } from '@/hooks/useAuth';
// translation
import { useTranslation } from 'react-i18next';

  const Register = () => {
    const { t } = useTranslation();
    // states
    const [ showPassword , setShowPassword ] = useState(false);
    const [ showConfirmPassword , setShowConfirmPassword ] = useState(false);
    // hook form
    const { register , handleSubmit , reset , formState , watch} = useForm<RegisterData>({
      mode : 'all',
      defaultValues : {
        name : '',
        email : '',
        password : '',
        password_confirmation : '',
        phone : ''
      }
    });
    const {errors} = formState;
    // react query 
    const {mutate , isLoading , error , isSuccess} = useRegister();

      useEffect(() => {
        if(isSuccess) {
          reset();
        }
      },[reset,isSuccess])

    // submit data
    const onSubmit = (data: RegisterData) => {
      mutate(data);
    };

  return (
    <Container className='min-h-screen grid items-center !text-start'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 place-items-center'>
        {/* Form section */}
        <div className='bg-gradient-to-b from-white to-primary-light max-w-lg lg:max-w-md xl:max-w-lg rounded-xl shadow-md !py-4 !px-6 sm:!px-12'>
          <div className='flex justify-center items-center'>
            <img src={logo} alt={t('register.logoAlt')} width={150} />
          </div>
          <h3 className='font-bold text-primary-main'>{t('register.createAccount')}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              className='!my-2'
              fullWidth
              label={t('register.nameLabel')}
              placeholder={t('register.namePlaceholder')}
              {...register('name', { required: t('register.nameRequired') })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              className='!mb-2'
              fullWidth
              label={t('register.emailLabel')}
              type="email"
              placeholder={t('register.emailPlaceholder')}
              {...register('email', {
                required: t('register.emailRequired'),
                validate: (value: string) => value.includes('@') || t('register.emailInvalid')
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              className='!mb-2'
              fullWidth
              label={t('register.passwordLabel')}
              type={showPassword ? 'text' : 'password'}
              placeholder={t('register.passwordPlaceholder')}
              {...register('password', {
                required: t('register.passwordRequired'),
                validate: (value: string) => value.length >= 8 || t('register.passwordTooShort')
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              className='!mb-2'
              fullWidth
              label={t('register.confirmPasswordLabel')}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder={t('register.confirmPasswordPlaceholder')}
              {...register('password_confirmation', {
                required: t('register.confirmPasswordRequired'),
                validate: (value: string) => value === watch('password') || t('register.passwordMismatch')
              })}
              error={!!errors.password_confirmation}
              helperText={errors.password_confirmation?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowConfirmPassword(prev => !prev)}>
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <TextField
              fullWidth
              label={t('register.phoneLabel')}
              placeholder={t('register.phonePlaceholder')}
              {...register('phone', {
                required: t('register.phoneRequired'),
                pattern: {
                  value: /^09\d{8}$/,
                  message: t('register.phoneInvalid')
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 1, color: 'white' }}
            >
              {isLoading ? <CircularProgress color='secondary' size={24} /> : t('register.registerButton')}
            </Button>
            <Typography variant='body2' className='text-center text-gray-500'>
              {t('register.alreadyHaveAccount')}{' '}
              <Link to='/login' className='hover:text-gray-800'>
                {t('register.signInLink')}
              </Link>
            </Typography>

            {error && (
              <Alert severity="error" variant="filled" className='!mt-4 rounded'>
                {error?.status === 422
                  ? t('register.validationError')
                  : error?.status === 409
                    ? t('register.emailExists')
                    : t('register.genericError')
                }
              </Alert>
            )}
          </form>
        </div>

        {/* Image section */}
        <div className='hidden lg:block'>
          <img src={Jewelry_Image} alt={t('register.jewelryImageAlt')} width={600} />
        </div>
      </div>
    </Container>
  );
};

export default Register;