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

  const Register = () => {

    const { register , handleSubmit , formState , watch} = useForm();
    const {errors} = formState; 
    const onSubmit = (data: any) => {
      console.log(data);
    };
    return (
      <Container>
        <div className='flex justify-center lg:justify-between gap-20 items-center w-full min-h-screen'>
          {/* Form section */}  
          <div className='bg-gradient-to-b from-[#fbfaf5] to-primary-light max-w-lg lg:max-w-md xl:max-w-lg rounded-xl shadow-lg !py-8 !px-6 sm:!px-12'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h2" variant="h5" color="primary.dark" className='!mb-3'>
              Register Now
              </Typography>
                <TextField
                  className='!mb-3'
                  fullWidth
                  label="Name"
                  {...register('name', { required: 'الاسم مطلوب' })}
                  error={!!errors.name}
                  // helperText={errors.name?.message}
                />
                <TextField
                  className='!mb-3'
                  fullWidth
                  label="Email"
                  type="email"
                  {...register('email', { required: 'البريد الإلكتروني مطلوب' })}
                  error={!!errors.email}
                  // helperText={errors.email?.message}
                />
                <TextField
                className='!mb-3'
                  fullWidth
                  label="Phone"
                  {...register('phone', { required: 'رقم الهاتف مطلوب' })}
                  error={!!errors.phone}
                  // helperText={errors.phone?.message}
                />
                <TextField
                  className='!mb-3'
                  fullWidth
                  label="Password"
                  type="password"
                  {...register('password', { required: 'كلمة المرور مطلوبة' })}
                  error={!!errors.password}
                  // helperText={errors.password?.message}
                />
                <TextField
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
                  sx={{ mt: 3, mb: 2 , color : 'white'}}
                >
                    Register
                </Button>
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