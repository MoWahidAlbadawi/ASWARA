import { useState , useEffect , useMemo } from "react";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import { Box, Typography , Icon , IconButton , Grid , Select , MenuItem, Chip} from "@mui/material";
// icons
import { IoIosSearch } from "react-icons/io";
import toast from "react-hot-toast";
// pagination (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { GetAllNotifications, ReadNotification } from "@/hooks/notification/useNotification";
import { filtersNotificationsDto , type Notification } from "@/services/types/notification";
import { FaBell } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { FaEnvelope } from 'react-icons/fa';

const Categories = () => {
    const { data , isLoading , isError , refetch} = GetAllNotifications();
    const { mutate : read , isSuccess : isSuccessRead , error : errorRead} = ReadNotification();

    const headers = [
        { title: 'Title' , key : 'data'},
        { title: 'Created At' , key : 'created_at'},
        { title: 'Is Readed' , key : 'read_at'},
        { title: "Actions", key: "actions" }
    ]


      // filters state
      const [filters, setFilters] = useState<filtersNotificationsDto>(
        new filtersNotificationsDto()
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
          pageIndex : 1
        }));
      }
    
      // filtered data
        const filteredData = useMemo(() => {
          if(!filters.searchTerm) return data || [];
          return data?.filter((item) => {
            return item.data.title
              .toLocaleLowerCase()
              .trim()
              .includes(filters.searchTerm.toLocaleLowerCase().trim());
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
                    if(isSuccessRead) {
                     toast.success('the notification read successfully');
                        // get all notifications after read one 
                        refetch();
                    }
                    if(errorRead) {
                        toast.error('error happens while reading notification');
                    }
            },[isSuccessRead , errorRead])
    
    // read notification
    function handleReadNotification (id : string) {
         read(id);
    }

    return <Box>
        {/* header  */}
        <Box className='flex justify-between  !mb-6'>
            <Typography color='secondary' variant="h5" className="flex justify-between items-center gap-1">
                <Icon><FaBell /></Icon> 
                <span>Notifications</span>
                </Typography>
        </Box>
        
      {/* Filters */}
      <Grid container spacing={1} className="!mb-3">
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
        <Grid size={{xs : 0 , md : 6}} className='hidden md:block'></Grid>
        {/* Search input */}
        <Grid size={{xs : 12 , sm : 6 , md : 3}} className="!mt-1 md:!mt-6">
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
            table='notifications'
            headers={headers}
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            startIndex={startIndex}
            customColumns={{
                data : (item : Notification) => <span>{item.data.title}</span>,
                created_at : (item : Notification) => <span dir="rtl">
                    {`${item.created_at.split('T')[1].slice(0,5)} - ${item.created_at.split('T')[0]} `} 
                </span>,
                read_at : (item : Notification) => <Chip 
                label={item.read_at ? 'مقروء' : 'غير مقروء'}
                color={item.read_at ? 'success' : 'error'}
                              className="!rounded-[12px] !text-[15px] w-[80px]"
                />,
             actions : (item : Notification) => item.read_at ?
             <Icon color="success"><IoMdDoneAll /></Icon> 
                 :
            <IconButton color="secondary" onClick={() => handleReadNotification(item.id)}>
                <FaEnvelope />
            </IconButton>
            }}
            showActions={false}
            />
            
                  {/* Pagination */}
                  {filteredData.length > 0 && (
                 <Box className="!mt-3 flex flex-col gap-3 md:gap-0 md:flex-row justify-center md:justify-between items-center">
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
export default Categories;