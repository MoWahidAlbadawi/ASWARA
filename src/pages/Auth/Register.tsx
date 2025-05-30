  import Jewelry_Image from '@/assets/Jewelry shop-pana.png';

  import { useForm } from 'react-hook-form';
  import {
    Button,
    TextField,
    Typography,
  } from '@mui/material';

  const Register = () => {

    const { register , handleSubmit , formState , watch} = useForm();
    const {errors} = formState; 
    const onSubmit = (data: any) => {
      console.log(data);
    };

    return (
        <div className='flex justify-center lg:justify-evenly items-center w-full min-h-screen'>
          {/* Form section */}  
          <div className='bg-gradient-to-b from-[#fbfaf5] to-primary-light max-w-xl lg:max-w-md xl:max-w-xl  rounded-lg' style={{padding : '50px'}}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  sx={{ mt: 3, mb: 2 , color : 'white'}}
                >
                    Register
                </Button>
          </form>
          </div>
          {/* Image section */}
          <div className='hidden lg:block'>
            <img src={Jewelry_Image} width={800}/>
          </div>
        </div>
    );
  };

  export default Register;