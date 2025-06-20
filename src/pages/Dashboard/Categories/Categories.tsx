import { DeleteCategory, getAllCategories } from "@/hooks/categories/useCategories";
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import { Box, Typography , Button , Icon} from "@mui/material";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

const Categories = () => {
    
    const { data , isLoading , isError , refetch} = getAllCategories();
    const { mutate } = DeleteCategory();

    const headers = [
        { title: 'Category Name' , key : 'name'},
        { title: 'Category Description' , key : 'description'},
        { title: 'Smithing Value' , key : 'smithing'},
        { title: 'Category Image' , key : 'categoryFile'},
    ]

    // delete category fucntion
    async function handleDeleteCategory (id : number) {
    await mutate(id);
    refetch();   
    }
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
            <DataTable 
            table='categories'
            headers={headers}
            data={data}
            isLoading={isLoading}
            isError={isError}
            onDeleteItem={handleDeleteCategory}
            />
      </Box>
}
export default Categories;