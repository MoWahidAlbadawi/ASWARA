import { useState , useMemo, useEffect } from "react";
// table (Manual) 
import DataTable from "@/components/Dashboard/DataTable/DataTable";
import classes from "@/components/Dashboard/DataTable/dataTable.module.css";
import { Box, Typography , Icon , IconButton , Grid , Select , MenuItem, Chip ,
     Dialog, DialogTitle, DialogContent, DialogActions, Button,
     CircularProgress
} from "@mui/material";
// icons
import { ClipboardList } from "lucide-react";
import { IoIosSearch } from "react-icons/io";
// pagination (react paginate)
import PaginatedItems from "@/components/Dashboard/DataTable/Pagination";
import { MdManageSearch } from "react-icons/md";
import toast from "react-hot-toast";
import { ApproveReviewRequest, GetAllReviewRequests, RejectReviewRequest } from "@/hooks/review-requests/useReviewRequests";
import { filtersReviewRequestsDto, type ReviewRequest, type ReviewRequestStatus } from "@/services/types/review-requests";
import { GetAllUsers } from "@/hooks/users/useUsers";
import DefaultImage from '@/assets/Jewelry_Auth.webp'
import { BASE_URL } from "@/services/endpoints";

const ReviewRequests = () => {
    const { data , isLoading , isError , refetch} = GetAllReviewRequests();
    const { data : users } =  GetAllUsers();

     const [selectedItem, setSelectedItem] = useState<ReviewRequest | null>(null);
    const { mutate : approve , isLoading : isLoadingApprove} = ApproveReviewRequest(selectedItem?.ReviewID || '');
    const { mutate : reject , isLoading : isLoadingReject} = RejectReviewRequest(selectedItem?.ReviewID || '');

    const headers = [
        { title: 'User Name' , key : 'UserID'},
        { title: 'Name' , key : 'ProductName'},
        { title: 'Description' , key : 'ProductDescription'},
        { title: 'Weight' , key : 'ProductWeight'},
        { title: 'Price' , key : 'ProductPrice'},
        { title: 'Status' , key : 'Status'},
        { title: 'Created At' , key : 'created_at'},
        { title: 'Updated At' , key : 'updated_at'},
        { title: 'Actions' , key : 'actions'},
    ]

    // Selected Request to manage it 
    const [openDialog, setOpenDialog] = useState(false);
    const handleOpenDialog = (item: ReviewRequest) => {
        setSelectedItem(item);
        setOpenDialog(true);
        };

     const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedItem(null);
        };
      // filters state
      const [filters, setFilters] = useState<filtersReviewRequestsDto>(
        new filtersReviewRequestsDto()
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
          if(!filters.searchTerm && !filters.status) return data || [];
          return data?.filter((item) => {
            const matchedName =  item.ProductName
              .toLocaleLowerCase()
              .trim()
              .includes(filters.searchTerm.toLocaleLowerCase().trim());
              const matchedStatus = filters.status === 'all' || item.Status === filters.status;
              console.log(matchedStatus)
              return matchedName && matchedStatus;
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
    
    function getUserName (UserID : number | string) {
    const user = users?.find(user => user.id === UserID);
    return user?.name  || '--';
  }

  
// Change Status
const statusOptions = [
          { value: "pending", label: "Pending", color: "warning" },
          { value: "rejected", label: "Rejected", color: "error" },
          { value: "approved", label: "Approved", color: "success" },
     ];


    function getStatusColor (status : ReviewRequestStatus) {
      switch(status)  {
        case 'pending' :
          return 'warning'
          case 'approved' :
            return 'success'
            case 'rejected' : 
            return 'error'
            default : 
            return 'warning'
      }
    } 
    
    function getStatusText (status : ReviewRequestStatus) {
      switch(status)  {
        case 'pending' :
          return 'Pending'
          case 'approved' :
            return 'Approved'
            case 'rejected' : 
            return 'Rejected'
            default : 
            return status
      }
    } 

    function handleApproveRequest () {
        approve(undefined,{
            onSuccess : () => {
                toast.success('تم الموافقة على المنتج بنجاح')
                refetch();
                handleCloseDialog();
            },
            onError : () => {
                toast.error('حدث خطأ أثناء الموافقة على المنتج')
            }
        });
    }
    function handleRejectRequest () {
        reject(undefined,{
            onSuccess : () => {
                toast.success('تم رفض على المنتج بنجاح')
                refetch();
                handleCloseDialog();
            },
            onError : () => {
                toast.error('حدث خطأ أثناء رفض على المنتج')
            }
        });
    }

    return <Box>
        {/* header  */}
        <Box className='flex justify-between  !mb-6'>
            <Typography color='secondary' variant="h5" className="flex justify-between items-center gap-1">
                <Icon><ClipboardList /></Icon> 
                <span>Review Reqeusts</span>
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
        {/* Status Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <label className="text-sm text-secondary-main">Filter by Status</label>
          <Select
            className="w-full max-h-[45px]"
            value={filters.status || ""}
            onChange={handleFiltersChange}
            name="status"
            displayEmpty
          >
            <MenuItem value="all">All</MenuItem>
      {statusOptions.map((item) => {
          return <MenuItem  key={item.value} value={item.value}>
            <Chip
                  label={item.label}
                  size="small"
                  color={item.color as any}
                  className="!rounded-[6px] !p-4 !text-[15px]"
                      />
          </MenuItem>
        })}
          </Select>
          </Grid>
        <Grid size={{xs : 0 , md : 3}} className='hidden md:block'></Grid>
        {/* Search input */}
        <Grid size={{xs : 12 , sm : 6 , md : 3}} className="!mt-1 md:!mt-6">
        <Box position={"relative"}>
          <input
            className={`${classes["input-search"]} pe-12`}
            placeholder="search by product name"
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
            table='review-requests'
            headers={headers}
            data={paginatedData}
            isLoading={isLoading}
            isError={isError}
            startIndex={startIndex}
            customColumns={{
            UserID : (item : ReviewRequest) => <span>{getUserName(item.UserID)}</span>,
            ProductWeight : (item : ReviewRequest) => <span dir="ltr">{Number(item.ProductWeight).toFixed(0)} g</span>,
            ProductPrice : (item : ReviewRequest) => <span dir="ltr">{Number(item.ProductPrice).toFixed(2)}$</span>,
            created_at : (item : ReviewRequest) => <span>{item.created_at.slice(0,10)}</span>,
            updated_at : (item : ReviewRequest) => <span>{item.updated_at.slice(0,10)}</span>,
           Status : (item : ReviewRequest) =>  <Chip
                           label={getStatusText(item.Status)}
                          size="small"
                         color={getStatusColor(item.Status)}
                        className="!rounded-[6px] !p-2 !text-[13px] min-w-[100px]"
                       />,
                    actions: (item: ReviewRequest) => (
                    <IconButton
                        color="primary"
                        onClick={() => handleOpenDialog(item)}
                        title="Manage Review Request"
                    >
                        <MdManageSearch />
                    </IconButton>)
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
                {/* Manage Review Request Dialog */}
            <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
            >
            <DialogTitle className="text-center !my-2">Manage Review Request</DialogTitle>
            <DialogContent>
                {selectedItem && (
                    <Box className="flex flex-col justify-center items-center">
                    {/* Image */}
                    <Box>
                    <img 
                    className="!-mt-12"
                    src={`${BASE_URL}/${selectedItem.ProductImages}`}
                    onError={e => (e.target as HTMLImageElement).src = DefaultImage}
                    width={300}
                    />
                    </Box>
                    {/* Info */}
                <Box className="grid grid-cols-2 gap-5 !-mt-5">
                    <Typography variant="subtitle1">
                    <strong>User:</strong> {getUserName(selectedItem.UserID)}
                    </Typography>
                    <Typography variant="subtitle1">
                    <strong>Product:</strong> {selectedItem.ProductName}
                    </Typography>
                    <Typography variant="body2">
                    <strong>Description:</strong> {selectedItem.ProductDescription}
                    </Typography>
                      <Typography variant="body2">
                    <strong>Status:</strong>{" "}
                    <Chip
                        label={getStatusText(selectedItem.Status)}
                        size="small"
                        color={getStatusColor(selectedItem.Status)}
                        className="!rounded-[6px] !p-2 !text-[13px]"
                    />
                    </Typography>
                    <Typography variant="body2">
                    <strong>Weight:</strong> {Number(selectedItem.ProductWeight).toFixed(0)}g
                    </Typography>
                    <Typography variant="body2">
                    <strong>Price:</strong> ${Number(selectedItem.ProductPrice).toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                    <strong>Created:</strong> {selectedItem.created_at.slice(0, 10)}
                    </Typography>
                    <Typography variant="body2">
                    <strong>Updated:</strong> {selectedItem.updated_at.slice(0, 10)}
                    </Typography>
                </Box>
                </Box>
                )}
            </DialogContent>
            <DialogActions className="!m-2">
                <Button onClick={handleCloseDialog} color="secondary" variant="outlined" 
                className="!capitalize">
                Close
                </Button>
                {/* You can add Approve/Reject buttons here later */}
                <Button onClick={handleApproveRequest} color="success" variant="contained"
                className="!capitalize">
                {isLoadingApprove ? <CircularProgress color="primary" size={24}/>: 'Approve'}
                </Button>
                <Button onClick={handleRejectRequest} color="error" variant="contained"
                className="!capitalize">
                 {isLoadingReject ? <CircularProgress color="primary" size={24}/>: 'Reject'}
                </Button>
            </DialogActions>
            </Dialog>

      </Box>
}
export default ReviewRequests;