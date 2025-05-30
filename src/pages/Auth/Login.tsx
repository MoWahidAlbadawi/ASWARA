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
  } from '@mui/material';

  const Login = () => {

    const { register , handleSubmit , formState } = useForm();
    const {errors} = formState; 
    const onSubmit = (data: any) => {
      console.log(data);
    };
    return (
      <Container>
        <div className='flex justify-center lg:justify-between gap-20 items-center w-full min-h-screen'>
          {/* Form section */}  
          <div className='bg-gradient-to-b from-[#fbfaf5] to-primary-light max-w-lg lg:max-w-md xl:max-w-lg rounded-xl shadow-lg !pt-16 !pb-32 !px-6 sm:!px-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2" variant="h5" color="primary.dark">
                Sign in
              </Typography>
                <TextField
                  margin="normal"
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
                  error={!!errors.email}
                  // helperText={errors.email?.message}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password', { required: 'كلمة المرور مطلوبة' })}
                  error={!!errors.password}
                  // helperText={errors.password?.message}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 , color : 'white'}}
                >
                    Sign in
                </Button>
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