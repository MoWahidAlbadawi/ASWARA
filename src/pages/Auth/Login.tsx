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
  import { FaEye , FaEyeSlash} from "react-icons/fa6";
  // import { IoMdEyeOff } from "react-icons/io";
//  interfaces
import { type LoginData } from '@/services/types/Auth';
// from react
import { useState } from 'react';
import { useLogin } from '@/hooks/useAuth';

const Login = () => {

  // states
const [showPassword , setShowPassword] = useState(false);
    // hook form
    const { register , handleSubmit , reset , formState } = useForm<LoginData>({
        defaultValues : {
            email : '',
            password : ''
        }
    });
    const {errors} = formState; 
    // tanstack query
    const { mutate , isLoading , error } = useLogin();
    // submit data
    const onSubmit = (data: LoginData) => {
      mutate(data);
      reset();
    };
    return (
      <Container>
        <div className='flex justify-center !-mt-8 sm:!-mt-0 lg:justify-between gap-20 items-center w-full min-h-screen'>
          {/* Form section */}  
          <div className='bg-gradient-to-b from-[#fbfaf5] to-primary-light max-w-lg lg:max-w-md xl:max-w-lg rounded-xl shadow-lg !pt-16 !pb-32 !px-6 sm:!px-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2" variant="h5" color="secondary">
                Sign in
              </Typography>
                <TextField
                  margin="normal"
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
                  margin="normal"
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  {...register('password', { required: 'password is required' , 
                    validate : (value : string) => {
                        return value.length  >= 8 || 'password must be 8 characters or more'
                    }
                   })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                   InputProps={{
                    endAdornment : (
                      <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword(prev => !prev)}>
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </IconButton>
                      </InputAdornment>
                    )
                   }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 1 , color : 'white'}}
                >
              { isLoading ? <CircularProgress color='secondary'/> : 'Login' }
                </Button>
                 <Typography variant='body2' className='text-center' color='secondary'>you don't have an account ? 
                    <Link to='/register' className='hover:text-gray-800'>Sign up</Link>
                  </Typography>
              {error && <Alert severity="error" variant='filled' className='!mt-4 rounded'>{error}</Alert>}
          </form>
          </div>
          {/* Image section */}
          <div className='hidden lg:block'>
            <img src={Jewelry_Image} width={800}/>
          </div>
        </div>
        </Container>
    );
  };

  export default Login;