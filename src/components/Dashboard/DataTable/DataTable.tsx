import { Box , IconButton, Icon , Select , MenuItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";
// actions icons
import { IoIosSearch } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import classes from './dataTable.module.css'
import { useEffect, useState } from "react";
import PaginatedItems from "./Pagination";

interface Props {
    table : string,
    headers : {key : string , title : string}[]
    isLoading : boolean,
    isError : boolean,
    data : any,
}

const DataTable = ({table , headers , isLoading , isError , data} : Props) => {
    const [search,setSearch] = useState('');
    const [limit , setLimit] = useState(8);
    const [page , setPage] = useState(1);
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
useEffect(() => {
    console.log(paginatedData,'data');
    console.log(limit,'limit')
    console.log(page,'page')
    console.log('start index',startIndex)
    console.log('end index',endIndex)
},[limit,page])
    // paginated data
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(page * limit,filteredData?.length);
    const paginatedData = filteredData ? filteredData.slice(startIndex,endIndex) : []; 
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
                            <td>{startIndex + index + 1}</td>
                            {headers.map((head , index : number) => (
                                <td key={index} className={classes['dashboard-table-td']}>
                                    {item[head.key]}
                                </td>
                            ))}
                                <td>
                                <Box className='flex justify-center'>
                                    <IconButton color='secondary'><Link to={`/aswaraDashboard/${table}/${index+1}`}><FaRegEdit /></Link></IconButton>
                                    <IconButton color='error'><RiDeleteBin5Fill /></IconButton>
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
        {/* pagination */}
        <Typography className="!mt-3 text-gray-600">show {startIndex + 1} to {endIndex} from {filteredData?.length}</Typography>
        <PaginatedItems 
        itemsPerPage={limit}
        total={filteredData?.length}
        handlePage={hanldePageChanged}
        />
         </Box>
}
export default DataTable;