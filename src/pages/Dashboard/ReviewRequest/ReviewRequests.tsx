import React , { useState, useMemo  } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { ClipboardList } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { MdManageSearch } from "react-icons/md";
import toast from "react-hot-toast";
import {
  ApproveReviewRequest,
  GetAllReviewRequests,
  RejectReviewRequest,
} from "@/hooks/review-requests/useReviewRequests";
import {
  filtersReviewRequestsDto,
  type ReviewRequest,
  type ReviewRequestStatus,
} from "@/services/types/review-requests";
import { GetAllUsers } from "@/hooks/users/useUsers";
import DefaultImage from "@/assets/Jewelry_Auth.webp";
import { BASE_URL } from "@/services/endpoints";
import { useTranslation } from "react-i18next"; 
// for transition dialog
import Slide from "@mui/material/Slide";
import type { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewRequests = () => {
  const { t } = useTranslation(); 
  const { data, isLoading, isError, refetch } = GetAllReviewRequests();
  const { data: users } = GetAllUsers();

  const [selectedItem, setSelectedItem] = useState<ReviewRequest | null>(null);
  const { mutate: approve, isLoading: isLoadingApprove } = ApproveReviewRequest(
    selectedItem?.ReviewID || ""
  );
  const { mutate: reject, isLoading: isLoadingReject } = RejectReviewRequest(
    selectedItem?.ReviewID || ""
  );

  const headers = [
    { title: t("reviewRequests.table.user"), key: "UserID" },
    { title: t("reviewRequests.table.name"), key: "ProductName" },
    { title: t("reviewRequests.table.description"), key: "ProductDescription" },
    { title: t("reviewRequests.table.weight"), key: "ProductWeight" },
    { title: t("reviewRequests.table.status"), key: "Status" },
    { title: t("reviewRequests.table.createdAt"), key: "created_at" },
    { title: t("reviewRequests.table.updatedAt"), key: "updated_at" },
    { title: t("reviewRequests.table.actions"), key: "actions" },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = (item: ReviewRequest) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const [filters, setFilters] = useState<filtersReviewRequestsDto>(
    new filtersReviewRequestsDto()
  );

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
        const matchedName = item.ProductName
          .toLocaleLowerCase()
          .trim()
          .includes(filters.searchTerm.toLocaleLowerCase().trim());
        const matchedStatus =
          filters.status === "all" || item.Status === filters.status;
        return matchedName && matchedStatus;
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

  function getUserName(UserID: number | string) {
    const user = users?.find((user) => user.id === UserID);
    return user?.name || t("common.unknownUser"); 
  }

  // Status options (used in filter dropdown)
  const statusOptions = [
    { value: "pending", label: t("reviewRequests.status.pending"), color: "warning" },
    { value: "rejected", label: t("reviewRequests.status.rejected"), color: "error" },
    { value: "approved", label: t("reviewRequests.status.approved"), color: "success" },
  ];

  function getStatusColor(status: ReviewRequestStatus) {
    switch (status) {
      case "pending":
        return "warning";
      case "approved":
        return "success";
      case "rejected":
        return "error";
      default:
        return "warning";
    }
  }

  function getStatusText(status: ReviewRequestStatus) {
    switch (status) {
      case "pending":
        return t("reviewRequests.status.pending");
      case "approved":
        return t("reviewRequests.status.approved");
      case "rejected":
        return t("reviewRequests.status.rejected");
      default:
        return status;
    }
  }

  function handleApproveRequest() {
    approve(undefined, {
      onSuccess: () => {
        toast.success(t("reviewRequests.messages.approveSuccess"));
        refetch();
        handleCloseDialog();
      },
      onError: () => {
        toast.error(t("reviewRequests.messages.approveError"));
      },
    });
  }

  function handleRejectRequest() {
    reject(undefined, {
      onSuccess: () => {
        toast.success(t("reviewRequests.messages.rejectSuccess"));
        refetch();
        handleCloseDialog();
      },
      onError: () => {
        toast.error(t("reviewRequests.messages.rejectError"));
      },
    });
  }

  return (
    <Box>
      {/* Header */}
      <Box className="flex justify-between !mb-6">
        <Typography color="secondary" variant="h5" className="flex justify-start items-center gap-1">
          <Icon>
            <ClipboardList />
          </Icon>
          <span>{t("navigation.reviewRequests")}</span>
        </Typography>
      </Box>

      {/* Filters */}
      <Grid container spacing={1} className="!mb-3">
        {/* Page size select */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <label className="text-sm text-secondary-main">
            {t("common.itemsPerPage")}
          </label>
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
          <label className="text-sm text-secondary-main">
            {t("reviewRequests.filters.status")}
          </label>
          <Select
            className="w-full max-h-[45px]"
            value={filters.status || ""}
            onChange={handleFiltersChange}
            name="status"
            displayEmpty
          >
            <MenuItem value="all">{t("reviewRequests.filters.all")}</MenuItem>
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
        <Grid size={{ xs: 12, sm: 6, md: 3 }} className="!mt-1 md:!mt-6">
          <Box position={"relative"}>
            <input
              className={`${classes["input-search"]} pe-12`}
              placeholder={t("reviewRequests.searchPlaceholder")}
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
        table="review-requests"
        headers={headers}
        data={paginatedData}
        isLoading={isLoading}
        isError={isError}
        startIndex={startIndex}
        customColumns={{
          UserID: (item: ReviewRequest) => <span>{getUserName(item.UserID)}</span>,
          ProductWeight: (item: ReviewRequest) => (
            <span dir="ltr">{Number(item.ProductWeight).toFixed(0)} g</span>
          ),
          ProductPrice: (item: ReviewRequest) => (
            <span dir="ltr">${Number(item.ProductPrice).toFixed(2)}</span>
          ),
          created_at: (item: ReviewRequest) => (
            <span>{item.created_at.slice(0, 10)}</span>
          ),
          updated_at: (item: ReviewRequest) => (
            <span>{item.updated_at.slice(0, 10)}</span>
          ),
          Status: (item: ReviewRequest) => (
            <Chip
              label={getStatusText(item.Status)}
              size="small"
              color={getStatusColor(item.Status)}
              className="!rounded-[6px] !p-2 !text-[13px] min-w-[100px]"
            />
          ),
          actions: (item: ReviewRequest) => (
            <IconButton
              color="primary"
              onClick={() => handleOpenDialog(item)}
              title={t("reviewRequests.actions.manage")}
            >
              <MdManageSearch />
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

      {/* Manage Review Request Dialog */}
      <Dialog
       open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
      >
       <DialogTitle className="text-center !my-2">
          <p className={
            selectedItem?.Status === 'approved' ? 'text-green-700 font-medium' :
            selectedItem?.Status === 'rejected' ? 'text-red-700 font-medium' :
            'text-secondary font-medium'
          }>
            {selectedItem?.Status === 'pending' ? t("reviewRequests.dialog.title") :
            selectedItem?.Status === 'approved' ? t('reviewRequests.dialog.approvedDone') :
            t('reviewRequests.dialog.rejectedDone')}
          </p>
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box className="flex flex-col justify-center items-center">
              {/* Image */}
              <Box>
                <img
                  className="!-mt-12"
                  src={`${BASE_URL}/${selectedItem.ProductImages}`}
                  onError={(e) => ((e.target as HTMLImageElement).src = DefaultImage)}
                  width={300}
                  alt={selectedItem.ProductName}
                />
              </Box>
              {/* Info */}
              <Box className="grid grid-cols-2 gap-5 !-mt-5">
                <Typography variant="subtitle1">
                  <strong>{t("reviewRequests.dialog.user")}:</strong> {getUserName(selectedItem.UserID)}
                </Typography>
                <Typography variant="subtitle1">
                  <strong>{t("reviewRequests.dialog.product")}:</strong> {selectedItem.ProductName}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.description")}:</strong>{" "}
                  {selectedItem.ProductDescription}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.status")}:</strong>{" "}
                  <Chip
                    label={getStatusText(selectedItem.Status)}
                    size="small"
                    color={getStatusColor(selectedItem.Status)}
                    className="!rounded-[6px] !p-2 !text-[13px]"
                  />
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.weight")}:</strong>{" "}
                  {Number(selectedItem.ProductWeight).toFixed(0)}g
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.price")}:</strong>{" "}
                  ${Number(selectedItem.ProductPrice).toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.createdAt")}:</strong>{" "}
                  {selectedItem.created_at.slice(0, 10)}
                </Typography>
                <Typography variant="body2">
                  <strong>{t("reviewRequests.dialog.updatedAt")}:</strong>{" "}
                  {selectedItem.updated_at.slice(0, 10)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="!m-2">
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            variant="outlined"
            className={`!capitalize ${selectedItem?.Status !== 'pending' ? '!px-12 !text-lg' : '!px-2'}`}
          >
            {t("common.close")}
          </Button>
            {selectedItem?.Status === 'pending' && <>
           <Button
            onClick={handleApproveRequest}
            color="success"
            variant="contained"
            className="!capitalize"
            disabled={isLoadingApprove || isLoadingReject}
          >
            {isLoadingApprove ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              t("reviewRequests.actions.approve")
            )}
          </Button>
          <Button
            onClick={handleRejectRequest}
            color="error"
            variant="contained"
            className="!capitalize"
            disabled={isLoadingApprove || isLoadingReject}
          >
            {isLoadingReject ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              t("reviewRequests.actions.reject")
            )}
          </Button>
        </>
        }
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewRequests;