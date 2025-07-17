import { useState , useEffect , useMemo } from "react";
import { DeleteCategory, getAllCategories } from "@/hooks/categories/useCategories";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import { Box, Typography , Button , Icon , Select , MenuItem} from "@mui/material";
// icons
import { IoIosSearch } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";
import { Link } from "react-router-dom";
import toast ,{ Toaster } from "react-hot-toast";
import { filtersCategoryDto } from "@/services/types/categories";
// pagination (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
const data = [
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''},
    {name : 'أساور' , description : 'very very very nice' , smithing : 15 , categoryFile : ''}
]
const Categories = () => {
    
    const { isLoading , isError , refetch} = getAllCategories();
    const { mutate , isSuccess : isSuccessDelete , error : errorDelete} = DeleteCategory();

    const headers = [
        { title: 'Category Name' , key : 'name'},
        { title: 'Category Description' , key : 'description'},
        { title: 'Smithing Value' , key : 'smithing'},
        { title: 'Category Image' , key : 'categoryFile'},
    ]

      // filters state
      const [filters, setFilters] = useState<filtersCategoryDto>(
        new filtersCategoryDto()
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
        filters.pageIndex = 1;
          const matchedSearch = data?.filter((item) => {
              return item.name.toLocaleLowerCase().trim()
                .includes(filters.searchTerm.toLocaleLowerCase().trim());
          });
          const matchedSmithing = data?.filter((item) => {
             return item.smithing === filters.smithingValue;
          });
            return (matchedSearch && matchedSmithing) || [];
      }, [filters]);
    
      // paginated data
      let startIndex = 0 , endIndex = 8;

      const paginatedData = useMemo(() => {
        filters.pageIndex = 1;
        startIndex = (filters.pageIndex - 1) * filters.pageSize;
        endIndex = Math.min(
          filters.pageIndex * filters.pageSize,
          filteredData.length
        );
        return filteredData.slice(startIndex, endIndex);
      }, [filters]);
    

     // handle delete feedback
            useEffect(() => {
                    if(isSuccessDelete) {
                     toast.success('the category deleted successfully',{
                        style : {
                        background : '#2e7d32',
                        color : 'white'
                            },
                            duration : 2000,
                        });
                        // get all categories after deleting
                        refetch();
                    }
                    if(errorDelete) {
                        toast.error('error happens while deleting category',{
                        style : {   
                        background : '#d32f2f',
                        color : 'white'
                            },
                            duration : 2000,
                        })
                    }
            },[isSuccessDelete,errorDelete])
        

    // delete category fucntion
    function handleDeleteCategory (id : number) {
    mutate(id);
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
        
      {/* Filters */}
      <Box className="!mb-3 flex flex-col md:flex-row justify-between items-center">
        <Box className="flex gap-2">
         {/* Page size select */}
          <Select
            className="min-w-1/8 max-h-[45px]"
            value={filters.smithingValue}
            onChange={handleFiltersChange}
            name="smithingValue"
          >
            <MenuItem value={5}>5 %</MenuItem>
            <MenuItem value={6}>6 %</MenuItem>
            <MenuItem value={7}>7 %</MenuItem>
            <MenuItem value={8}>8 %</MenuItem>
            <MenuItem value={9}>9 %</MenuItem>
            <MenuItem value={10}>10 %</MenuItem>
            <MenuItem value={11}>11 %</MenuItem>
            <MenuItem value={12}>12 %</MenuItem>
            <MenuItem value={13}>13 %</MenuItem>
            <MenuItem value={14}>14 %</MenuItem>
            <MenuItem value={15}>15 %</MenuItem>
          </Select>
         {/* Page size select */}
          <Select
            className="min-w-1/8 max-h-[45px]"
            value={filters.pageSize}
            onChange={handleFiltersChange}
            name="pageSize"
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
          </Select>
        </Box>

        {/* Search input */}
        <Box position={"relative"} width={"fit-content"}>
          <input
            className={classes["input-search"]}
            placeholder="Search"
            value={filters.searchTerm}
            onChange={handleFiltersChange}
            name="searchTerm"
          />
          <Icon className={classes["input-search-icon"]}>
            <IoIosSearch />
          </Icon>
        </Box>
      </Box>
        {/* data  table */}
            <DataTable 
            table='categories'
            headers={headers}
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            startIndex={startIndex}
            onDeleteItem={handleDeleteCategory}
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
        {/* toast */}
        <Toaster />
      </Box>
}
export default Categories;