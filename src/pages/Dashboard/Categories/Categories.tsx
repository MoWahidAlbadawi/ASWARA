import { Box, Typography , Button , Icon} from "@mui/material";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
// import DataTable from "@/components/Dashboard/DataTable/DataTable";

const Categories = () => {
    

    return <Box>
        {/* header  */}
        <Box className='flex justify-between  !mb-6'>
            <Typography color='secondary' variant="h5">
                <Icon className="!pt-1"><TbCategoryFilled/></Icon> Categories </Typography>
            <Button variant='contained' className='!text-white !capitalize'>
                <Link to='/aswaraDashboard/category/add'>Add Category</Link>
            </Button>
        </Box>
        {/* data  table */}
            {/* <DataTable 
            table='users'
            headers={headers}
            data={data}
            isLoading={isLoading}
            isError={isError}
            /> */}
      </Box>
}
export default Categories;