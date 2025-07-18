// import { useState , useEffect , useMemo } from "react";
// import { DeleteProduct, GetAllProducts } from "@/hooks/products/useProducts";
// // table (Manual) 
// import DataTable from "@/components/Dashboard/DataTable/DataTable";
// import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
// import { Box, Typography , Button , Icon , Grid , Select , MenuItem} from "@mui/material";
// // icons
// import { IoIosSearch } from "react-icons/io";
// import { TbCategoryFilled } from "react-icons/tb";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { filtersCategoryDto } from "@/services/types/categories";
// // pagination (react paginate)
// import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";

// const Products = () => {
    
//     const { data , isLoading , isError , refetch} = GetAllProducts();
//     const { mutate , isSuccess : isSuccessDelete , error : errorDelete} = DeleteProduct();

//     const headers = [
//         { title: 'Category Name' , key : 'name'},
//         { title: 'Category Description' , key : 'description'},
//         { title: 'Smithing Value' , key : 'smithing'},
//     ]

//       // filters state
//       const [filters, setFilters] = useState<filtersCategoryDto>(
//         new filtersCategoryDto()
//       );
    
//       // handle page change
//       function hanldePageChanged(page: number) {
//         setFilters((prev) => ({ ...prev, pageIndex: page }));
//       }
    
//       // handle filters input change
//       function handleFiltersChange(e: any) {
//         setFilters((prev) => ({
//           ...prev,
//           [e.target.name]: e.target.value,
//         }));
//       }
    
//       // filtered data
//         const filteredData = useMemo(() => {
//           return data?.filter((item) => {
//             const matchesSearch = item.name
//               .toLocaleLowerCase()
//               .trim()
//               .includes(filters.searchTerm.toLocaleLowerCase().trim());

//             const matchesSmithing = (filters.smithingValue && filters.smithingValue !==0) ? 
//             filters.smithingValue === item.smithing : true;

//             return matchesSearch && matchesSmithing;
//           }) || [];
//         }, [filters, data]);
    
//   // paginated data
//   let startIndex = 0 , endIndex = Math.min(startIndex + filters.pageSize,filteredData.length);

//   const paginatedData = useMemo(() => {
//     startIndex = (filters.pageIndex - 1) * filters.pageSize;
//     endIndex = Math.min(
//       startIndex + filters.pageSize,
//       filteredData.length
//     );
//     return filteredData.slice(startIndex, endIndex);
//   }, [filters,filteredData]);
    

//      // handle delete feedback
//             useEffect(() => {
//                     if(isSuccessDelete) {
//                      toast.success('the category deleted successfully');
//                         // get all categories after deleting
//                         refetch();
//                     }
//                     if(errorDelete) {
//                         toast.error('error happens while deleting category');
//                     }
//             },[isSuccessDelete,errorDelete])
    
//     // delete category fucntion
//     function handleDeleteCategory (id : number) {
//     mutate(id);
//     }

//     return <Box>
//         {/* header  */}
//         <Box className='flex justify-between  !mb-6'>
//             <Typography color='secondary' variant="h5">
//                 <Icon className="!pt-1"><TbCategoryFilled/></Icon> Categories </Typography>
//             <Button variant='contained' className='!text-white !capitalize'>
//                 <Link to='/aswaraDashboard/category/add'>Add Category</Link>
//             </Button>
//         </Box>
        
//       {/* Filters */}
//       <Grid container spacing={2} className="!mb-3">
//         <Grid size={{xs : 12 , sm : 6 , md : 3}}>
//           <label className="text-sm text-secondary-main">Smithing</label>
//          {/* Page size select */}
//           <Select
//             className="w-full max-h-[45px]"
//             value={filters.smithingValue}
//             onChange={handleFiltersChange}
//             name="smithingValue"
//           >
//             <MenuItem value={0}>Select Smithing</MenuItem>
//             <MenuItem value={5}>5 %</MenuItem>
//             <MenuItem value={6}>6 %</MenuItem>
//             <MenuItem value={7}>7 %</MenuItem>
//             <MenuItem value={8}>8 %</MenuItem>
//             <MenuItem value={9}>9 %</MenuItem>
//             <MenuItem value={10}>10 %</MenuItem>
//             <MenuItem value={11}>11 %</MenuItem>
//             <MenuItem value={12}>12 %</MenuItem>
//             <MenuItem value={13}>13 %</MenuItem>
//             <MenuItem value={14}>14 %</MenuItem>
//             <MenuItem value={15}>15 %</MenuItem>
//             <MenuItem value={16}>16 %</MenuItem>
//             <MenuItem value={17}>17 %</MenuItem>
//             <MenuItem value={18}>18 %</MenuItem>
//             <MenuItem value={19}>19 %</MenuItem>
//             <MenuItem value={20}>20 %</MenuItem>
//           </Select>
//           </Grid>
//          {/* Page size select */}
//          <Grid size={{xs : 12 , sm : 6 , md : 3}}>
//           <label className="text-sm text-secondary-main">Items Per Page</label>
//           <Select
//             className="w-full max-h-[45px]"
//             value={filters.pageSize}
//             onChange={handleFiltersChange}
//             name="pageSize"
//           >
//             <MenuItem value={8}>8</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//           </Select>
//         </Grid> 
//         <Grid size={{xs : 0 , md : 3}} className='hidden md:block'></Grid>
//         {/* Search input */}
//         <Grid size={{xs : 12 , sm : 6 , md : 3}} className="md:!mt-6">
//         <Box position={"relative"}>
//           <input
//             className={`${classes["input-search"]} pe-12`}
//             placeholder="Search"
//             value={filters.searchTerm}
//             onChange={handleFiltersChange}
//             name="searchTerm"
//           />
//           <Icon className="absolute end-2 text-primary-main top-[50%] transform -translate-y-[50%]">
//             <IoIosSearch />
//           </Icon>
//         </Box>
//         </Grid>
//       </Grid>
//         {/* data  table */}
//             <DataTable 
//             table='categories'
//             headers={headers}
//             data={paginatedData}
//             isLoading={isLoading}
//             isError={isError}
//             startIndex={startIndex}
//             onDeleteItem={handleDeleteCategory}
//             />
            
//                   {/* Pagination */}
//                   {filteredData.length > 0 && (
//                     <Box className="!mt-3 flex justify-between items-center">
//                       <Typography className="text-gray-600">
//                         Show {startIndex + 1} to {endIndex} from {filteredData.length}
//                       </Typography>
//                       <PaginatedItems
//                         itemsPerPage={filters.pageSize}
//                         total={filteredData.length}
//                         onHandlePage={hanldePageChanged}
//                       />
//                     </Box>
//                   )}
//       </Box>
// }
// export default Products;

const Products = () => {
    return <p>Products page</p>
}
export default Products;