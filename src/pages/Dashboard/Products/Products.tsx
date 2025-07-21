import { useState , useEffect , useMemo } from "react";
import { DeleteProduct, GetAllProducts } from "@/hooks/products/useProducts";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import { Box, Typography , Button , Icon , Grid , Select , MenuItem} from "@mui/material";
// icons
import { IoIosSearch } from "react-icons/io";
import { LuTableProperties } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { filtersProductDto } from '@/services/types/products'
// pagination (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { getAllCategories } from "@/hooks/categories/useCategories";

const Products = () => {
    
    const { data , isLoading , isError , refetch} = GetAllProducts();
    const { data : categories } = getAllCategories();
    const { mutate , isSuccess : isSuccessDelete , error : errorDelete} = DeleteProduct();

    const headers = [
        { title: 'Name' , key : 'name'},
        { title: 'Description' , key : 'decription'},
        { title: 'Weight' , key : 'weight'},
        { title: 'Price' , key : 'price'},
        { title: 'Quantity' , key : 'quantity'},
        { title: 'Category' , key : 'category_name'},
        { title: 'Featured' , key : 'isFeatured'},
    ]

      // filters state
      const [filters, setFilters] = useState<filtersProductDto>(
        new filtersProductDto()
      );
    
      // handle page change
      function hanldePageChanged(page: number) {
        setFilters((prev) => ({ ...prev, pageIndex: page }));
      }
    
      // handle filters input change
      function handleFiltersChange(e: any) {
        setFilters((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      }
    
      // filtered data
        const filteredData = useMemo(() => {
          return data?.filter((item) => {
            const matchesSearch = item.name
              .toLocaleLowerCase()
              .trim()
              .includes(filters.searchTerm.toLocaleLowerCase().trim());

            const matchesCategory = filters.categoryId ? 
            filters.categoryId === item.categoryid : true;

            return matchesSearch && matchesCategory;
          }) || [];
        }, [filters, data]);
    
  // paginated data
  let startIndex = 0 , endIndex = Math.min(startIndex + filters.pageSize,filteredData.length);

  const paginatedData = useMemo(() => {
    startIndex = (filters.pageIndex - 1) * filters.pageSize;
    endIndex = Math.min(
      startIndex + filters.pageSize,
      filteredData.length
    );
    return filteredData.slice(startIndex, endIndex);
  }, [filters,filteredData]);
    

     // handle delete feedback
            useEffect(() => {
                    if(isSuccessDelete) {
                     toast.success('the product deleted successfully');
                        // get all categories after deleting
                        refetch();
                    }
                    if(errorDelete) {
                        toast.error('error happens while deleting product');
                    }
            },[isSuccessDelete,errorDelete])
    
    // delete category fucntion
    function handleDeleteProduct (id : number) {
    mutate(id);
    }

    return <Box>
        {/* header  */}
        <Box className='flex justify-between  !mb-6'>
            <Typography color='secondary' variant="h5" className="flex justify-center items-center gap-1">
                <Icon><LuTableProperties /></Icon> 
                <span>Products</span> 
                </Typography>
            <Button variant='contained' className='!text-white !capitalize'>
                <Link to='/aswaraDashboard/product/add'>Add Product</Link>
            </Button>
        </Box>
        
      {/* Filters */}
      <Grid container spacing={2} className="!mb-3">
        <Grid size={{xs : 12 , sm : 6 , md : 3}}>
          <label className="text-sm text-secondary-main">Category</label>
         {/* Page size select */}
          <Select
            className="w-full max-h-[45px]"
            value={filters.categoryId}
            onChange={handleFiltersChange}
            name="categoryId"
          > 
            <MenuItem value={0}>Select Category</MenuItem>
            {categories?.map((category) => {
              return    <MenuItem value={category.id}>{category.name}</MenuItem>
            })}
          </Select>
          </Grid>
         {/* Page size select */}
         <Grid size={{xs : 12 , sm : 6 , md : 3}}>
          <label className="text-sm text-secondary-main">Items Per Page</label>
          <Select
            className="w-full max-h-[45px]"
            value={filters.pageSize}
            onChange={handleFiltersChange}
            name="pageSize"
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </Grid> 
        <Grid size={{xs : 0 , md : 3}} className='hidden md:block'></Grid>
        {/* Search input */}
        <Grid size={{xs : 12 , sm : 6 , md : 3}} className="md:!mt-6">
        <Box position={"relative"}>
          <input
            className={`${classes["input-search"]} pe-12`}
            placeholder="search by name"
            value={filters.searchTerm}
            onChange={handleFiltersChange}
            name="searchTerm"
          />
          <Icon className="absolute end-2 text-primary-main top-[50%] transform -translate-y-[50%]">
            <IoIosSearch />
          </Icon>
        </Box>
        </Grid>
      </Grid>
        {/* data  table */}
            <DataTable 
            table='products'
            headers={headers}
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            startIndex={startIndex}
            onDeleteItem={handleDeleteProduct}
            customColumns={{
                weight : (item : any) => <span>{item.weight} g</span>,
                price : (item : any) => <span>{item.price} s.p</span>,
                isFeatured : (item : any) => <Icon>
                    {item.isFeatured == 1 ? <FaStar /> : <FaRegStar />}
                </Icon>
            }}
            />
            
                  {/* Pagination */}
                  {filteredData.length > 0 && (
                    <Box className="!mt-3 flex justify-between items-center">
                      <Typography className="text-gray-600">
                        Show {startIndex + 1} to {endIndex} from {filteredData.length}
                      </Typography>
                      <PaginatedItems
                        itemsPerPage={filters.pageSize}
                        total={filteredData.length}
                        onHandlePage={hanldePageChanged}
                      />
                    </Box>
                  )}
      </Box>
}
export default Products;
