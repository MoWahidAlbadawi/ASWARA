import NavBar from "@/components/Dashboard/NavBar";
import Sidebar from "@/components/Dashboard/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
// menu context
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
import { useTranslation } from "react-i18next";

const LayoutDashboard = () => {
    const { i18n } = useTranslation();
    const ctxMenu = useContext(MenuContext);
    const sideBarClasses = `${ctxMenu.showMenu ? 'start-0' : '-start-full lg:start-0'} h-screen fixed top-0  shadow-md bg-white z-50 border-r border-gray-300`;
    const contentClasses = `${ctxMenu.showMenu ? 'start-0 lg:start-[21%] xl:start-[16%] w-full lg:w-[79%] xl:w-[84%]' : 'start-0 lg:start-[8%] xl:start-[6%] w-full lg:w-[92%] xl:w-[94%] '} 
             transition-all duration-300 ease-in-out absolute top-0 flex flex-col gap-6 min-h-screen`;
    const parentClasses = `min-h-screen ${(i18n.language || 'en') === 'ar' ? 'arabic' : 'english'}`;

    return (    
        // main Box
        <Box className={parentClasses}>
            {/* sidebar */}
        <Box className={sideBarClasses}>
                <Sidebar />
        </Box>
            {/* navbar & page */}
            <Box className={contentClasses}>
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