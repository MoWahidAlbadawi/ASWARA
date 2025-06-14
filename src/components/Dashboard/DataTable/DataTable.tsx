import { Box , IconButton } from "@mui/material";
// import { Link } from "react-router-dom";
// actions icons
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import classes from './dataTable.module.css'

interface Props {
    table : string,
    headers : {key : string , title : string}[]
    isLoading : boolean,
    isError : boolean,
    data : any,
}

const DataTable = ({headers , isLoading , isError , data} : Props) => {

    return  <Box sx={{overflowX : 'auto'}}> 
            <table className={classes['dashboard-table']}>
                <thead>
                    <tr className={classes['dashboard-table-tr-head']}>
                        <th>User Number</th>
                        {headers.map((head) => (
                            <th className={classes['dashboard-table-th']}>{head.title}</th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* isLoading */}
                    {isLoading && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>loading...</td>
                    </tr>}
                     {/* isError */}
                    {isError && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>Something went wrong , please try again!</td>
                    </tr>}
                    {/* no data */}
                    {!isLoading && !isError && data.length == 0 && <tr className={classes['dashboard-table-tr-full']}>
                        <td className={classes['dashboard-table-td']} colSpan={100}>No data found</td>
                        </tr>}
                    {/* all rights */}
                    {!isLoading && !isError && data && data.map((item : any,index : number) => (
                        <tr key={index} className={classes['dashboard-table-tr']}>
                            <td>{index+1}</td>
                            {headers.map((head , index : number) => (
                                <td key={index} className={classes['dashboard-table-td']}>
                                    {item[head.key]}
                                </td>
                            ))}
                                <td>
                                <Box>
                                    <IconButton color='secondary'><FaRegEdit /></IconButton>
                                    <IconButton color='error'><RiDeleteBin5Fill /></IconButton>
                                </Box>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
}
export default DataTable;