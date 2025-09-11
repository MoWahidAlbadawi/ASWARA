import { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Icon,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Chip,
} from "@mui/material";
import { ShoppingCart } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { GetAllOrders } from "@/hooks/order/useOrder";
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { filtersOrderDto, type Order, type OrderStatus } from "@/services/types/orders";
import { GetAllUsers } from "@/hooks/users/useUsers";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // 👈 Added

const Orders = () => {
  const { t } = useTranslation(); // 👈 Initialize translation
  const { data, isLoading, isError } = GetAllOrders();
  const { data : users } = GetAllUsers();
  const navigate = useNavigate();

  const headers: { title: string; key: string }[] = [
    { title: t("orders.table.user"), key: "UserID" },
    { title: t("orders.table.status"), key: "Status" },
    { title: t("orders.table.totalAmount"), key: "TotalAmount" },
    { title: t("orders.table.shippingAddress"), key: "ShippingAddress" },
    { title: t("orders.table.createdAt"), key: "created_at" },
    { title: t("orders.table.updatedAt"), key: "updated_at" },
    { title: t("orders.table.actions"), key: "actions" },
  ];

  const [filters, setFilters] = useState<filtersOrderDto>(new filtersOrderDto());

  function handlePageChanged(page: number) {
    setFilters((prev) => ({ ...prev, pageIndex: page }));
  }

  function handleFiltersChange(e: any) {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      pageIndex: 1,
    }));
  }

  const filteredData = useMemo(() => {
    if (!filters.searchTerm && !filters.status) return data || [];
    return (
      data?.filter((item) => {
        const matchedName = getUserName(item.UserID)
          .toLocaleLowerCase()
          .trim()
          .includes(filters.searchTerm.toLocaleLowerCase().trim());
        const matchedStatus = filters.status === "all" || item.Status === filters.status;
        return matchedName && matchedStatus;
      }) || []
    );
  }, [filters.searchTerm, filters.status, data]);

  let startIndex = 0,
    endIndex = Math.min(startIndex + filters.pageSize, filteredData.length);

  const paginatedData = useMemo(() => {
    startIndex = (filters.pageIndex - 1) * filters.pageSize;
    endIndex = Math.min(startIndex + filters.pageSize, filteredData.length);
    return filteredData.slice(startIndex, endIndex);
  }, [filters.pageIndex, filters.pageSize, filteredData]);

  function getUserName(UserID: number | string) {
    const user = users?.find((user) => user.id === UserID);
    return user?.name || t("common.unknownUser");
  }

  function navigateToOrderDetails(id: string | number) {
    navigate(`/orders/${id}`);
  }

  // Status Options
  const statusOptions = [
    { value: "pending", label: t("orders.status.pending"), color: "warning" },
    { value: "processing", label: t("orders.status.processing"), color: "info" },
    { value: "shipped", label: t("orders.status.shipped"), color: "success" },
    { value: "delivered", label: t("orders.status.delivered"), color: "secondary" },
    { value: "cancelled", label: t("orders.status.cancelled"), color: "error" },
  ];

  function getStatusColor(status: OrderStatus) {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "success";
      case "delivered":
        return "secondary";
      case "cancelled":
        return "error";
      default:
        return "warning";
    }
  }

  function getStatusText(status: OrderStatus) {
    switch (status) {
      case "pending":
        return t("orders.status.pending");
      case "processing":
        return t("orders.status.processing");
      case "shipped":
        return t("orders.status.shipped");
      case "delivered":
        return t("orders.status.delivered");
      case "cancelled":
        return t("orders.status.cancelled");
      default:
        return status;
    }
  }

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h6" className="flex justify-center items-center gap-1">
          <Icon>
            <ShoppingCart />
          </Icon>
          {t("navigation.orders")} {/* 👈 Uses existing key */}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid spacing={2} container className="!mb-3">
        {/* Page size select */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <label className="text-sm text-secondary-main">{t("common.itemsPerPage")}</label>
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

        {/* Status Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <label className="text-sm text-secondary-main">{t("orders.filters.status")}</label>
          <Select
            className="w-full max-h-[45px]"
            value={filters.status || ""}
            onChange={handleFiltersChange}
            name="status"
            displayEmpty
          >
            <MenuItem value="all">{t("orders.filters.all")}</MenuItem>
            {statusOptions.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                <Chip
                  label={item.label}
                  size="small"
                  color={item.color as any}
                  className="!rounded-[6px] !p-4 !text-[15px]"
                />
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={{ xs: 0, md: 3 }} className="hidden md:block"></Grid>

        {/* Search input */}
        <Grid size={{ xs: 12, sm: 5, md: 3 }}>
          <Box position={"relative"} className="!mt-6">
            <input
              className={classes["input-search"]}
              placeholder={t("orders.searchPlaceholder")}
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
        table="orders"
        headers={headers}
        data={paginatedData}
        isLoading={isLoading}
        isError={isError}
        startIndex={startIndex}
        customColumns={{
          TotalAmount: (item: Order) => <span>{item.TotalAmount} $</span>,
          created_at: (item: Order) => <span>{item.created_at?.slice(0, 10) || "--"}</span>,
          updated_at: (item: Order) => <span>{item.updated_at?.slice(0, 10) || "--"}</span>,
          UserID: (item: Order) => <span>{getUserName(item.UserID)}</span>,
          Status: (item: Order) => (
            <Chip
              label={getStatusText(item.Status)}
              size="small"
              color={getStatusColor(item.Status)}
              className="!rounded-[6px] !p-2 !text-[13px] min-w-[100px]"
            />
          ),
          actions: (item: any) => (
            <IconButton
              onClick={() => navigateToOrderDetails(item.OrderID)}
              title={t("orders.actions.viewDetails")}
            >
              <FaEye />
            </IconButton>
          ),
        }}
        showActions={false}
      />

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Box className="!mt-3 flex flex-col gap-3 md:gap-0 md:flex-row justify-center md:justify-between items-center">
          <Typography className="text-gray-600">
            {t("common.pagination.showing", {
              start: startIndex + 1,
              end: endIndex,
              total: filteredData.length,
            })}
          </Typography>
          <PaginatedItems
            itemsPerPage={filters.pageSize}
            total={filteredData.length}
            onHandlePage={handlePageChanged}
          />
        </Box>
      )}
    </Box>
  );
};

export default Orders;