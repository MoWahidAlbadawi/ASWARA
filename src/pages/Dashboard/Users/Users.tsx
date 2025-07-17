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
} from "@mui/material"
// icons
import { FaUsers } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
// custom react query hooks
import { GetAllUsers, DeleteUser } from "@/hooks/users/useUsers";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
// paginate (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
// toast
import toast, { Toaster } from "react-hot-toast";
// filter data
import { filtersUserDto } from "@/services/types/users";

const data = [
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'},
  {name : 'wahid' , email : 'wahod@test.com' , phone : '093064054' , userType : 'admin'}
]

const Users = () => {
  const { isLoading, isError, refetch } = GetAllUsers();
  const { mutate, isSuccess: isSuccessDelete , error: errorDelete } = DeleteUser();

  const headers: { title: string; key: string }[] = [
    { title: "Name", key: "name" },
    { title: "Email", key: "email" },
    { title: "Phone", key: "phone" },
    { title: "User Role", key: "userType" },
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
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  // filtered data
  const filteredData = useMemo(() => {
    filters.pageIndex = 1;
    return data
      ? data.filter((item) =>
          item.name
            .toLocaleLowerCase()
            .trim()
            .includes(filters.searchTerm.toLocaleLowerCase().trim())
        )
      : [];
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
    if (isSuccessDelete) {
      toast.success("The user was deleted successfully", {
        style: {
          background: "#2e7d32",
          color: "white",
        },
        duration: 2000,
      });
      refetch();
    }
    if (errorDelete) {
      toast.error("Error occurred while deleting user", {
        style: {
          background: "#d32f2f",
          color: "white",
        },
        duration: 2000,
      });
    }
  }, [isSuccessDelete, errorDelete]);

  // delete user
  function handleDeleteUser(id: number) {
    mutate(id);
  }

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h6">
          <Icon className="!pt-1">
            <FaUsers />
          </Icon>{" "}
          Users
        </Typography>
        <Button variant="contained" className="!text-white !capitalize">
          <Link to="/aswaraDashboard/user/add">Add User</Link>
        </Button>
      </Box>

      {/* Filters */}
      <Box className="!mb-3 flex flex-col md:flex-row justify-between items-center">
        {/* Page size select */}
        <Box>
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

      {/* Toast */}
      <Toaster />
    </Box>
  );
};

export default Users;
