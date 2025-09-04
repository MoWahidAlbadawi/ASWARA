import { TextField , Button , CircularProgress , LinearProgress , Select , MenuItem , Typography , Icon} from "@mui/material";
import { useForm ,Controller} from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { ModifyUserInterface } from "@/services/types/users";
import { GetUserById, UpdateUser } from "@/hooks/users/useUsers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Err404 from "@/pages/Errors/Err404";
import { Users } from 'lucide-react';

const ModifyUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    
    const isProfileMode = searchParams.get('profileMode') === 'true';

    // react hook form
    const { register , reset , handleSubmit , formState , control} = useForm<ModifyUserInterface>({
        mode : 'all'
    });
    const { errors } = formState;

    // react query
    const { data : userInfo , isLoading : isLoadingGet , error : errorGet} = GetUserById(userId ?? '');
    const { mutate : modify , isLoading : isLoadingSet , error : errorSet , isSuccess : isSuccessSet } = UpdateUser(userId ?? '');

    useEffect(() => {
        if(userInfo) {
            reset({
              name : userInfo.name,
              email : userInfo.email,
              userType : userInfo.userType,
              phone : userInfo.phone,
            });
        }
    },[userInfo])

    // handle finishing the request
    useEffect(() => {
        const controller = new AbortController();
        if(isSuccessSet) {
            toast.success('the user edited successfully');
            reset();
            setTimeout(() => {
                // You can modify the navigation based on the `isProfileMode`
                // For example: if (isProfileMode) { navigate('/profile'); } else { navigate('/users'); }
                navigate('/users');
            }, 2000);
        }
        if(errorSet) {
            toast.error('error happens while editing user');
        }
        return () => {
            controller.abort();
        }
    },[isSuccessSet,errorSet])

    // add
    function onSubmit (data : ModifyUserInterface) {
        modify(data);
    }

    // cancel
    function cancelAddUser () {
        navigate('/users');
        reset();
    }

    // user id not found
    if(errorGet) {
        return <Err404 />
    }
    
    // Now you can use the `isProfileMode` variable to conditionally render or change logic
    // For example, changing the header text or disabling certain fields.
    const pageTitle = isProfileMode ? 'Profile / Edit Profile' : 'Users / Modify User';

    return (
        <div>
            {/* header */}
            <Typography color="secondary" variant="h6" className="!mb-5 flex justify-start items-center gap-1">
                <Icon><Users /></Icon>
                {pageTitle}
            </Typography>
            {/* form */}
            {isLoadingGet ? 
                <LinearProgress color="primary" /> : 
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* fields */}
                    <div className={isProfileMode ? 'grid grid-cols-1 gap-3' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                        {/* user name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">{isProfileMode ? 'Name' :  'User Name'}<span className="text-red-600">*</span></label>
                            <TextField 
                                placeholder="Enter user name"
                                variant="outlined"
                                {...register('name',{
                                    required : 'user name is required'
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </div>
                        {/* user email*/}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">{isProfileMode ? 'Email' : 'User Email'}<span className="text-red-600">*</span></label>
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
                        {/* user phone */}
                        <div className="flex flex-col gap-2">
                            <label className="text-secondary-main">{isProfileMode ? 'Phone' : 'User Phone'}<span className="text-red-600">*</span></label>
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
                        {/* You could conditionally hide this field if isProfileMode is true */}
                        {isProfileMode ? null : (
                            <div className="flex flex-col gap-2">
                                <label className="text-secondary-main">User Role<span className="text-red-600">*</span></label>
                                <Controller
                                    name="userType"
                                    control={control}
                                    rules={{ required: 'user role is required' }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            value={field.value ?? ""}
                                            variant="outlined"
                                            displayEmpty
                                            error={!!errors.userType}
                                        >
                                            <MenuItem value="user">User</MenuItem>
                                            <MenuItem value="product_manager">Product Manager</MenuItem>
                                            <MenuItem value="admin">Admin</MenuItem>
                                        </Select>
                                    )}
                                />
                            </div>
                        )}
                    </div>
                    {/* actions */}
                    <div className="flex gap-3 !my-8">
                        <Button type="submit" variant="contained" className="!text-white !capitalize">
                            {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : 'Save'}
                        </Button>
                        <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}} onClick={cancelAddUser}>Cancel</Button>
                    </div>
                </form>
            }
        </div>
    );
}

export default ModifyUser;