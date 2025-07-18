import { Link } from 'react-router-dom';
import Jewelry_Image from '@/assets/Jewelry_Auth.png';
// logo
import logo from '@/assets/Logo.png'
import { useForm } from 'react-hook-form';
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
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useLogin } from '@/hooks/useAuth';
import { type LoginData } from '@/services/types/Auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<LoginData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { errors } = formState;
  const { mutate, isLoading, error , isSuccess} = useLogin();

  useEffect(() => {
    if(isSuccess) {
      reset();
    }
  },[reset,isSuccess])

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  return (
    <Container className='min-h-screen grid items-center'>
      <div
      className='grid grid-cols-1 lg:grid-cols-2 place-items-center'>
        {/* Form section */}
        <div  className='max-w-lg lg:max-w-md !p-8 rounded-lg bg-gradient-to-b from-white to-primary-light shadow-lg'>
          {/* Welcome message */}
          <div className='flex flex-col justify-center items-center'>
            <img src={logo} alt="Welcome" width={200}/>
            <p className='text-center text-gray-500'>
              Please login to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                validate: (value: string) => value.includes('@') || 'Please enter a valid email'
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete='new-email'
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                validate: (value: string) => value.length >= 8 || 'Password must be 8 characters or more'
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 1, color: 'white' }}
            >
              {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Login'}
            </Button>

            <Typography variant="body2" className='text-center text-gray-500'>
              Don't have an account?{' '}
              <Link to="/register" className="hover:text-gray-800">Sign up</Link>
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
          <img src={Jewelry_Image} alt="Jewelry Auth"  width={700}/>
        </div>
      </div>
    </Container>
  );
};

export default Login;
