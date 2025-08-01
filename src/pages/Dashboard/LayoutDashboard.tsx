import NavBar from "@/components/Dashboard/NavBar";
import Sidebar from "@/components/Dashboard/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
// menu context
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
const LayoutDashboard = () => {
    const ctxMenu = useContext(MenuContext);
    const sideBarClasses = `${ctxMenu.showMenu ? 'left-0' : '-left-full'} h-screen absolute top-0 lg:static shadow-md bg-white z-50 border-r border-gray-300`;
    return (
        // main Box
        <Box className='flex gap-6 min-h-screen'>
            {/* sidebar */}
            <Box className={sideBarClasses}>
                <Sidebar />
        </Box>
            {/* navbar & page */}
            <Box className='flex flex-col gap-6 w-full min-h-screen'>
            {/* navbar */}
            
            <Box className='h-[70px] shadow-md rounded w-full'>
                <NavBar />
            </Box>
            {/* dynamic page */}
            <Box className='w-[95%] !mx-auto !mb-12'> 
                <Outlet />
            </Box>
        </Box>
        </Box>
    )
}

export default LayoutDashboard;