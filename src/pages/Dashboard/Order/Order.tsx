import { useMemo, useState } from "react";
// components from mui
import {
  Box,
  Typography,
  Icon,
  Select,
  MenuItem,
  Grid,
  IconButton,
} from "@mui/material"
// icons
import { IoMdGitPullRequest } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { FaEye } from "react-icons/fa";
// custom react query hooks
import { GetAllOrders } from "@/hooks/order/useOrder";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
// paginate (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
// filter data
import { filtersOrderDto } from "@/services/types/orders";
import { GetAllUsers } from "@/hooks/users/useUsers";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { data , isLoading, isError } = GetAllOrders();
  const { data : users } = GetAllUsers();

  const navigate = useNavigate();

  const headers: { title: string; key: string }[] = [
    { title: "User", key: "userid" },
    { title: "Order Date", key: "orderDate" },
    { title: "Status", key: "status" },
    { title: "Total Amount", key: "totalAmount" },
    { title: "Shipping Address", key: "shippingAddress" },
    { title: "Actions", key: "actions" },
  ];

  // filters state
  const [filters, setFilters] = useState<filtersOrderDto>(
    new filtersOrderDto()
  );

  // handle page change
  function hanldePageChanged(page: number) {
    setFilters((prev) => ({ ...prev, pageIndex: page }));
  }

  // handle filters input change
  function handleFiltersChange(e: any) {
    setFilters((prev) => {
      return ({...prev , 
        [e.target.name] : e.target.value,
        pageIndex : 1
      })
    });
  }


//   filtered data
const filteredData = useMemo(() => {
  if (!filters.searchTerm && !filters.status) return data || [];
  return data?.filter((item) =>
    getUserName(item.userid)
      .toLocaleLowerCase()
      .trim()
      .includes(filters.searchTerm.toLocaleLowerCase().trim())
  ) || [];
}, [filters.searchTerm , filters.status , data]);



  // paginated data
  let startIndex = 0 , endIndex = Math.min(startIndex + filters.pageSize,filteredData.length);

  const paginatedData = useMemo(() => {
    startIndex = (filters.pageIndex - 1) * filters.pageSize;
    endIndex = Math.min(
      startIndex + filters.pageSize,
      filteredData.length
    );
    return filteredData.slice(startIndex, endIndex);
  }, [filters.pageIndex, filters.pageSize, filteredData]);


  function getUserName (userId : number | string) {
    const user = users?.find(user => user.id === userId);
    return user?.name  || '--';
  }

  function navigateToOrderDetails (id : string | number) {
    navigate(`/orders/${id}`);
  }

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h6" className="flex justify-center items-center gap-1">
          <Icon>
            <IoMdGitPullRequest />
          </Icon>
          Orders
        </Typography>
      </Box>

      {/* Filters */}
      <Grid spacing={2} container className="!mb-3">
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
        <Grid size={{xs : 12 , sm : 6 , md : 3}} className="w-full max-h-[45px]">
            {/* FILTER BY STAUS HERE  */}
        </Grid>
        <Grid size={{xs : 0  , md : 3}} className="hidden md:block"></Grid>
        {/* Search input */}
        <Grid size={{xs : 12 , sm : 5 , md : 3}}>
        <Box position={"relative"} className="!mt-6">
          <input
            className={classes["input-search"]}
            placeholder="search by user"
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

      {/* Data Table */}
      <DataTable
        table="users"
        headers={headers}
        data={paginatedData}
        isLoading={isLoading}
        isError={isError}
        startIndex={startIndex}
        customColumns={{
             totalAmount : (item : any) => <span>{item.totalAmount} $</span>,
             orderDate : (item : any) => <span>{item.orderDate.slice(0,10)}</span>,
             userid : (item : any) => <span>{getUserName(item.userid)}</span>,
             actions : (item : any) => <IconButton onClick={() => navigateToOrderDetails(item.id)}><FaEye/></IconButton>
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
  );
};

export default Orders;
