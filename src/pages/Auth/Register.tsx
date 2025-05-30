import { useForm } from 'react-hook-form';
import {
  Button,
  TextField,
  Typography,
} from '@mui/material';

const RegisterPage = () => {

  const { register , handleSubmit , formState , watch} = useForm();
  const {errors} = formState; 
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
      <div className='w-full min-h-screen lg:grid lg:grid-cols-2'>
        {/* Form section */}
        <div className='bg-gradient-to-b  from-white to-primary-light'>
        <form onSubmit={handleSubmit(onSubmit)}
        className='w-[80%] md:w-[60%]' style={{margin : '100px auto'}}>
          <Typography component="h2" variant="h5" color="primary.dark">
            Register Now
            </Typography>
              <TextField
                margin="normal"
                fullWidth
                label="Name"
                {...register('name', { required: 'الاسم مطلوب' })}
                error={!!errors.name}
                // helperText={errors.name?.message}
              />
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
                label="Phone"
                {...register('phone', { required: 'رقم الهاتف مطلوب' })}
                error={!!errors.phone}
                // helperText={errors.phone?.message}
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
              <TextField
                margin="normal"
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword', {
                  required: 'تأكيد كلمة المرور مطلوب',
                  validate: value => value === watch('password') || 'كلمتا المرور غير متطابقتين'
                })}
                error={!!errors.confirmPassword}
                // helperText={errors.confirmPassword?.message}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                  Register
              </Button>
        </form>
        </div>
        {/* Image section */}
        <div className='hidden lg:block'></div>
      </div>
  );
};

export default RegisterPage;