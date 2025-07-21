import { TextField , Button , CircularProgress , LinearProgress , Select , MenuItem , Typography , Icon} from "@mui/material";
import { useForm ,Controller} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { ModifyUserInterface } from "@/services/types/users";
import {  GetUserById, UpdateUser } from "@/hooks/users/useUsers";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Err404 from "@/pages/Errors/Err404";
import { FaUsers } from "react-icons/fa6";

const ModifyUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    // react hook form
    const { register , reset , handleSubmit , formState , control} = useForm<ModifyUserInterface>({
        mode : 'all'
    });
    const { errors } = formState;
    // react query
    const { data : userInfo , isLoading : isLoadingGet , error : errorGet } = GetUserById(userId ?? '');
    const { mutate : modify , isLoading : isLoadingSet , error : errorSet , isSuccess : isSuccessSet  } = UpdateUser(userId ?? '');


    
    // react hook form saving the previous values so it is show them until it get the new data
    // i reset data each userId change
    // so it is reset the form then get the data reset with new real values
        useEffect(() => {
        reset();
        }, [userId]);

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
                navigate('/aswaraDashboard/users');
                },2000);
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
        reset();
    }
    // cancel
    function cancelAddUser () {
        navigate('/aswaraDashboard/users');
        reset();
    }

        // user id not found
        if(errorGet) {
            return <Err404 />
        }

    return <div>
                {/* header  */}
        <Typography color="secondary" variant="h6" className="!mb-5 flex justify-start items-center gap-1">
          <Icon>
            <FaUsers />
          </Icon>
          Users / Modify Users
        </Typography>
            {/* form */}
            {isLoadingGet ? 
            <LinearProgress color="primary" /> : 
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
        </div>
        {/* actions */}
            <div className="flex gap-3 !my-8">
                <Button type="submit" variant="contained" className="!text-white !capitalize">
                    {isLoadingSet ? <CircularProgress color="secondary" size={24} /> : 'Save'}
                </Button>
                <Button variant="contained" color='error' sx={{textTransform : 'capitalize'}}
                onClick={cancelAddUser}>Cancel</Button>
            </div>
        </form>}
    </div>
}
export default ModifyUser;