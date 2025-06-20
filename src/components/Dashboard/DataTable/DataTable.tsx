// components from mui
import { Box , IconButton, Icon , Select , MenuItem, Typography , Button , Slide ,
     Dialog , DialogActions , DialogContent , DialogTitle , DialogContentText
} from "@mui/material";
import { Link } from "react-router-dom";
// actions icons
import { IoIosSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import classes from './dataTable.module.css'
import React , { useState } from "react";
import PaginatedItems from "./Pagination";
// no data image
import NoDataImage from "@/assets/no-data.jpg"
// for transition dialog
import type { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface Props {
    table : string,
    headers : {key : string , title : string}[]
    isLoading : boolean,
    isError : boolean,
    data : any,
    onDeleteItem : (itemId : number) => void,
}

const DataTable = ({table , headers , isLoading , isError , data , onDeleteItem} : Props) => {
    // filter state
    const [search,setSearch] = useState<string>('');
    // pagination states
    const [limit , setLimit] = useState<number>(8);
    const [page , setPage] = useState<number>(1);
    // dialog state
    const [open , setOpen] = useState<boolean>(false);
    const [deleteElementId , setDeleteElementId] = useState<number>(0)
    // filter with search
     const filteredData = data ? data.filter((item : any) => item.name.toLowerCase().trim().includes(search.toLocaleLowerCase().trim())) : [];
 
    //  handle pagination fns (page & limit)
    // page
    function hanldePageChanged (page : number) {
        setPage(page);
    }
    // limit
    function handleLimitChanged (e : any) { 
        setLimit(e.target.value);
    }
    // paginated data
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(page * limit,filteredData?.length);
    const paginatedData = filteredData ? filteredData.slice(startIndex,endIndex) : []; 
    // dialog functions 
function handleClickOpen  (id : number)  {
        setOpen(true);
        setDeleteElementId(id);
  };
  function handleClose  () {
        setOpen(false);
  };
//   delete
function handleDeleteItem () {
    onDeleteItem(deleteElementId);
    handleClose();
}
    return <Box>
        {/* search & pagination select */}
        <Box className="!mb-3 flex justify-between items-center">
             <Box position={'relative'} width={'fit-content'}>
                <input 
                className={classes['input-search']}
                placeholder='search'
                value={search} 
                onChange={(e) => setSearch(e.target.value)} />
                <Icon className={classes['input-search-icon']}>
                    <IoIosSearch />
                </Icon>
            </Box>
              <Select value={limit} onChange={handleLimitChanged}
                className="min-w-1/8 max-h-[45px]">
                    <MenuItem value={8}>8</MenuItem>
                     <MenuItem value={10}>10</MenuItem>
                     <MenuItem value={25}>25</MenuItem>
                    </Select>      
            </Box>
        {/* table */}
          <Box sx={{overflowX : 'auto'}}> 
            <table className={classes['dashboard-table']}>
                <thead>
                    <tr className={classes['dashboard-table-tr-head']}>
                        <th className={classes['dashboard-table-th']}>Number</th>
                        {headers.map((head) => (
                            <th className={classes['dashboard-table-th']}>{head.title}</th>
                        ))}
                        <th className={classes['dashboard-table-th']}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* isLoading */}
                    {isLoading && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>Loading...</td>
                    </tr>}
                     {/* isError */}
                    {isError && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>Something went wrong , please try again!</td>
                    </tr>}
                    {/* no data */}
                    {!isLoading && !isError && paginatedData.length == 0 && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>No data found</td>
                        </tr>}
                    {/* all rights */}
                    {!isLoading && !isError && paginatedData && paginatedData.map((item : any,index : number) => (
                        <tr key={index} className={classes['dashboard-table-tr']}>
                            <td className={classes['dashboard-table-td']}>{startIndex + index + 1}</td>
                            {headers.map((head , index : number) => (   
                                <td key={index} className={classes['dashboard-table-td']}>
                                    {head.key == 'categoryFile' ? <div className="flex justify-center"><img src={item[head.key] ? item[head.key] : NoDataImage} 
                                    className="w-[100px] h-[100px] rounded-3xl "/></div> : 
                                    head.key == 'smithing' ? `${item[head.key]} %` : item[head.key]}
                                </td>
                            ))}
                                <td>
                                <Box className='flex justify-center'>
                                    <IconButton color='secondary'><Link to={`/aswaraDashboard/${table}/${item.id}`}><FaRegEdit /></Link></IconButton>
                                    <IconButton color='error' onClick={() => handleClickOpen(item.id)}><RiDeleteBin5Fill /></IconButton>
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
        {/* pagination */}
        {filteredData.length > 0 && <Box>
        <Typography className="!mt-3 text-gray-600">show {startIndex + 1} to {endIndex} from {filteredData?.length}</Typography>
        <PaginatedItems 
        itemsPerPage={limit}
        total={filteredData?.length}
        onHandlePage={hanldePageChanged}
        />
        </Box>}
        {/* dialog for delete */}
        <Box>
      <Dialog
        open={open}
        slots={{
          transition: Transition,
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Are you sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            The item will be permanetly deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform : 'capitalize'}}>Cancel</Button>
          <Button onClick={handleDeleteItem} color="error" sx={{textTransform : 'capitalize'}}>Delete</Button>
        </DialogActions>
      </Dialog>
        </Box> 

         </Box>
}
export default DataTable;