import { TextField , Button , CircularProgress , Select , MenuItem} from "@mui/material";
import { useForm ,Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { AddUserInterface } from "@/services/types/users";
import { AddNewUser } from "@/hooks/users/useUsers";
import { useEffect } from "react";
import toast , { Toaster } from "react-hot-toast";

const AddUser = () => {
    const navigate = useNavigate();
    // react hook form
    const { register , reset , handleSubmit , formState , control} = useForm<AddUserInterface>({
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
            const controller = new AbortController();
            if(isSuccess) {
             toast.success('the user added successfully',{
                style : {
                background : '#2e7d32',
                color : 'white'
                    },
                    duration : 2000,
                })
                reset();
                setTimeout(() => {
                navigate('/aswaraDashboard/users');
                },2000);
            }
            if(error) {
                toast.error('error happens while adding user',{
                style : {   
                background : '#d32f2f',
                color : 'white'
                    },
                    duration : 2000,
                })
            }
            return () => {
                controller.abort();
            }
    },[isSuccess,error])

    // add
    function onSubmit (data : AddUserInterface) {
        addNewUser(data);
    }
    // cancel
    function cancelAddUser () {
        navigate('/aswaraDashboard/users');
        reset();
    }

    return <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* user name */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">User Name</label>
            <TextField 
            placeholder="Enter user name"
            variant="outlined"
            {...register('name',{
                required : 'user name is reqiured'
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            />
        </div>
        {/* user email*/}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">User Email</label>
            <TextField 
            placeholder="Enter user email"
            variant="outlined"
            {...register('email',{
                required : 'user email is required',
                validate : (value : string) => {
                    return value.includes('@') || 'please enter a valid user email'
                }
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            />
        </div>
        {/* user password */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">User Password</label>
            <TextField 
            placeholder="Enter user password"
            variant="outlined"
            {...register('password',{
                required : 'password user is required',
                validate : (value : string) => {
                    return value.length >= 8 || 'password must be 8 charcters or more' 
                }
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            />
        </div>
        {/* user phone */}
        <div className="flex flex-col gap-2">
            <label className="text-secondary-main">User Phone</label>
            <TextField 
            placeholder="Enter user phone number"
            variant="outlined"
            {...register('phone',{
                required : 'user phone is required',
                pattern : {
                    value: /^09\d{8}$/,
                     message: 'phone number must start with 09 and be exactly 10 digits',
            },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            />
        </div>
        {/* user role */}
        <div className="flex flex-col gap-2">
    <label className="text-secondary-main">User Role</label>
           <Controller
                name="userType"
                control={control}
                rules={{ required: 'user role is required' }}
                render={({ field }) => (
                    <Select
                        {...field}
                        variant="outlined"
                        displayEmpty
                        error={!!errors.userType}
                    >
                        <MenuItem value="" disabled>Select role</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="product_manager">Product Manager</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                )}
        />
        </div>
        </div>
        {/* actions */}
            <div className="flex gap-3 !my-8">
                <Button type="submit" variant="contained" className="!text-white !capitalize">
                    {isLoading ? <CircularProgress color="secondary" size={24} /> : 'Save'}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancelAddUser}>Cancel</Button>
                <Toaster />
            </div>
        </form>
    </div>
}
export default AddUser;