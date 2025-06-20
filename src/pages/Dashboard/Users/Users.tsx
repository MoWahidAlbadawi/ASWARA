import { Box, Typography , Button , Icon} from "@mui/material";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
// actions icons
import { GetAllUsers , DeleteUser } from "@/hooks/users/useUsers";
import DataTable from "@/components/Dashboard/DataTable/DataTable";

const Users = () => {
    const {data , isLoading , isError , refetch} = GetAllUsers();
    const { mutate } = DeleteUser();

    const headers : {title : string , key : string}[] = [
        {title : 'Name' , key : 'name'},
        {title : 'Email' , key : 'email'},
        {title : 'Phone' , key : 'phone'},
        {title : 'User Role' , key : 'userType'}
    ];
    // delete user function
    async function handleDeleteUser (id : number) {
    await mutate(id);   
    refetch();
    }

    return <Box>
        {/* header  */}
        <Box className='flex justify-between  !mb-6'>
            <Typography color='secondary' variant="h5">
                <Icon className="!pt-1"><FaUsers /></Icon> Users </Typography>
            <Button variant='contained' className='!text-white !capitalize'>
                <Link to='/aswaraDashboard/user/add'>Add User</Link>
            </Button>
        </Box>
        {/* data  table */}
            <DataTable 
            table='users'
            headers={headers}
            data={data}
            isLoading={isLoading}
            isError={isError}
            onDeleteItem={handleDeleteUser}
            />
      </Box>
}
export default Users;