import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import {
  Box,
  Typography,
  Icon,
  IconButton,
  Grid,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { IoIosSearch } from "react-icons/io";
import toast from "react-hot-toast";
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { GetAllNotifications, ReadNotification } from "@/hooks/notification/useNotification";
import { filtersNotificationsDto, type Notification } from "@/services/types/notification";
import { FaBell } from "react-icons/fa6";
import { IoMdDoneAll } from "react-icons/io";
import { FaEnvelope } from "react-icons/fa";
import { useTranslation } from "react-i18next"; 

const Notifications = () => {
  const { t } = useTranslation();
  const { data, isLoading, isError, refetch } = GetAllNotifications();
  const { mutate: read, isSuccess: isSuccessRead, error: errorRead } = ReadNotification();

  const headers = [
    { title: t("notifications.table.title"), key: "data" },
    { title: t("notifications.table.createdAt"), key: "created_at" },
    { title: t("notifications.table.isRead"), key: "read_at" },
    { title: t("notifications.table.actions"), key: "actions" },
  ];

  const [filters, setFilters] = useState<filtersNotificationsDto>(new filtersNotificationsDto());

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
    if (!filters.searchTerm) return data || [];
    return (
      data?.filter((item) => {
        return item.data.title
          .toLocaleLowerCase()
          .trim()
          .includes(filters.searchTerm.toLocaleLowerCase().trim());
      }) || []
    );
  }, [filters, data]);

  let startIndex = 0,
    endIndex = Math.min(startIndex + filters.pageSize, filteredData.length);

  const paginatedData = useMemo(() => {
    startIndex = (filters.pageIndex - 1) * filters.pageSize;
    endIndex = Math.min(startIndex + filters.pageSize, filteredData.length);
    return filteredData.slice(startIndex, endIndex);
  }, [filters, filteredData]);

  useEffect(() => {
    if (isSuccessRead) {
      toast.success(t("notifications.readSuccess"));
      refetch();
    }
    if (errorRead) {
      toast.error(t("notifications.readError"));
    }
  }, [isSuccessRead, errorRead, refetch, t]);

  function handleReadNotification(id: string) {
    read(id);
  }

  // Format date/time for display
  function formatDateTime(dateTimeString: string): string {
    if (!dateTimeString) return "--";
    const [date, time] = dateTimeString.split("T");
    const formattedTime = time ? time.slice(0, 5) : "";
    return `${formattedTime} - ${date}`;
  }

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h5" className="flex justify-start items-center gap-1">
          <Icon>
            <FaBell />
          </Icon>
          <span>{t("navigation.notifications")}</span> {/* 👈 Uses existing key */}
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={1} className="!mb-3">
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

        <Grid size={{ xs: 0, md: 6 }} className="hidden md:block"></Grid>

        {/* Search input */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }} className="!mt-1 md:!mt-6">
          <Box position={"relative"}>
            <input
              className={`${classes["input-search"]} pe-12`}
              placeholder={t("notifications.searchPlaceholder")}
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
        table="notifications"
        headers={headers}
        data={paginatedData}
        isLoading={isLoading}
        isError={isError}
        startIndex={startIndex}
        customColumns={{
          data: (item: Notification) => <span>{item.data.message || "--"}</span>,
          created_at: (item: Notification) => (
            <span dir="ltr">{formatDateTime(item.created_at)}</span>
          ),
          read_at: (item: Notification) => (
            <Chip
              label={item.read_at ? t("notifications.status.read") : t("notifications.status.unread")}
              color={item.read_at ? "success" : "error"}
              className="!rounded-[12px] !text-[15px] w-[80px]"
            />
          ),
          actions: (item: Notification) =>
            item.read_at ? (
              <Icon color="success">
                <IoMdDoneAll />
              </Icon>
            ) : (
              <IconButton
                color="secondary"
                onClick={() => handleReadNotification(item.id)}
                title={t("notifications.actions.markAsRead")}
              >
                <FaEnvelope />
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

export default Notifications;