// router
import { Link } from 'react-router-dom';
//auth image
import Jewelry_Image from '@/assets/Jewelry_Auth.png';
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

  const Register = () => {
    // states
    const [ showPassword , setShowPassword ] = useState(false);
    const [ showConfirmPassword , setShowConfirmPassword ] = useState(false);
    // hook form
    const { register , handleSubmit , reset , formState , watch} = useForm<RegisterData>({
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
      <Container className='min-h-screen grid items-center'>
        <div className='grid grid-cols-1 lg:grid-cols-2 place-items-center gap-12'>
          {/* Form section */}  
          <div className='bg-gradient-to-b from-white to-primary-light max-w-lg lg:max-w-md xl:max-w-lg rounded-xl shadow-md  !-mt-10 sm:!-mt-0 !py-8 !px-6 sm:!px-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h3" variant='h5' color="primary" fontWeight='bold'>
              Create Your Account
              </Typography>
                <TextField
                  className='!my-3'
                  fullWidth
                  label="Name"
                  placeholder='Enter your name'
                  {...register('name', { required: 'name is required' })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  className='!mb-3'
                  fullWidth
                  label="Email"
                  type="email"
                  placeholder='Enter your email'
                  {...register('email', { required: 'email is required' , 
                    validate : (value : string) => {
                      return value.includes('@') || 'please enter a valid email';
                    }
                   })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                <TextField
                  className='!mb-3'
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  {...register('password', { required: 'password is required' ,
                    validate : (value : string) => {
                      return value.length >=8 || 'password must be 8 characters  or more';
                    }
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment : (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(prev => !prev)}>
                          {showPassword ? <FaEyeSlash/> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                className='!mb-3'
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Confirm the password'
                  {...register('password_confirmation', {
                    required: 'confirm password is required',
                    validate: (value : string) => {
                      return value === watch('password') || 'value must be same the original password'
                    }
                    })}
                  error={!!errors.password_confirmation}
                  helperText={errors.password_confirmation?.message}
                    InputProps={{
                    endAdornment : (
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
                  label="Phone"
                  placeholder="Enter your phone number"
                  {...register('phone', {
                    required: 'phone number is required',
                    pattern: {
                      value: /^09\d{8}$/,
                      message: 'phone number must start with 09 and be exactly 10 digits',
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
                  sx={{ mt: 3, mb : 1 , color : 'white'}}
                >
                    { isLoading ? <CircularProgress color='secondary'/> : 'Register' }
                </Button>
                  <Typography variant='body2'  className='text-center text-gray-500'>
                    Already have an account ? 
                    <Link to='/login' className='hover:text-gray-800'>Sign in</Link>
                  </Typography>

                  {error && (
                  <Alert severity="error" variant="filled" className='!mt-4 rounded'>
                 {error?.status == 401 ? 'username or password incorrect!' : 'something went wrong , please try again later!'}
              </Alert>
              )}
          </form>
          </div>
          {/* Image section */}
          <div className='hidden lg:block'>
            <img src={Jewelry_Image} width={600}/>
          </div>
        </div>
        </Container>
    );
  };

export default Register;