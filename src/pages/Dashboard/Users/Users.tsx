import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
// components from mui
import {
  Box,
  Typography,
  Button,
  Icon,
  Select,
  MenuItem,
  Grid
} from "@mui/material"
// icons
import { FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
// custom react query hooks
import { GetAllUsers, DeleteUser, GetCurrentUser } from "@/hooks/users/useUsers";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
// paginate (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
// toast
import toast from "react-hot-toast";
// filter data
import { filtersUserDto } from "@/services/types/users";

const Users = () => {
  const { data , isLoading, isError, refetch } = GetAllUsers();
  const { data : currentUser} = GetCurrentUser();
  const { mutate, isSuccess: isSuccessDelete , error: errorDelete } = DeleteUser();

  const headers: { title: string; key: string }[] = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Phone", key: "phone" },
    { title: "Role", key: "userType" },
  ];

  // filters state
  const [filters, setFilters] = useState<filtersUserDto>(
    new filtersUserDto()
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

  const usersWithoutCurrentUser = useMemo(() => {
    return data ? 
    data.filter((user) => user.id !== currentUser?.id)
    : []
  },[data,currentUser]);

  // filtered data
const filteredData = useMemo(() => {
  if (!filters.searchTerm) return usersWithoutCurrentUser;
  return usersWithoutCurrentUser.filter((item) =>
    item.name
      .toLocaleLowerCase()
      .trim()
      .includes(filters.searchTerm.toLocaleLowerCase().trim())
  );
}, [filters.searchTerm, usersWithoutCurrentUser]);


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

  // handle delete feedback
  useEffect(() => {
    if (isSuccessDelete) {
      toast.success("The user was deleted successfully");
      refetch();
    }
    if (errorDelete) {
      toast.error("Error occurred while deleting user");
    }
  }, [isSuccessDelete, errorDelete]);

  // delete user
  function handleDeleteUser(id: number) {
    mutate(id);
  }

  useEffect(() => {
    console.log(filters)
  },[filters])



  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h6" className="flex justify-center items-center gap-1">
          <Icon>
            <FaUsers />
          </Icon>
          Users
        </Typography>
        <Button variant="contained" className="!text-white !capitalize">
          <Link to="/aswaraDashboard/user/add">Add User</Link>
        </Button>
      </Box>

      {/* Filters */}
      <Grid spacing={2} container className="!mb-3">
        {/* Page size select */}
        <Grid size={{xs : 12 , sm : 5 , md : 3}}>
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
        <Grid size={{xs : 0 , sm : 2 , md : 6}} className="hidden md:block"></Grid>
        {/* Search input */}
        <Grid size={{xs : 12 , sm : 5 , md : 3}}>
        <Box position={"relative"} className="!mt-6">
          <input
            className={classes["input-search"]}
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

      {/* Data Table */}
      <DataTable
        table="users"
        headers={headers}
        data={paginatedData}
        isLoading={isLoading}
        isError={isError}
        startIndex={startIndex}
        onDeleteItem={handleDeleteUser}
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
  );
};

export default Users;
