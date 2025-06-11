import { SlMenu } from "react-icons/sl";
import { IconButton , Menu , MenuItem , Button , Divider, Stack, Typography} from "@mui/material";
// context to mange menu 
import { useContext, useEffect, useState } from "react";
import { MenuContext } from "@/context/MenuContext";
import { getCurrentUser } from "@/hooks/users/useUser";
import { FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
// logout component
import Logout from "./Auth/Logout";
const NavBar = () => {
    // menu context for control with sidebar
    const ctxMenu = useContext(MenuContext);
    // current user
    const {data : currentUser} = getCurrentUser();
    // menu functions and states for show current user info
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
useEffect(()=> {
    console.log(currentUser)
},[currentUser])
    return (
        <div className="flex justify-between !p-4 text-primary-main">
            <div className="flex">
                {/* menu */}
                <IconButton className="text-xl" color="primary" onClick={() => ctxMenu.toggleMenu()}>
                    <SlMenu />
                </IconButton>
            </div>  
             {/* bell and menu user */}
                <div className="flex gap-2 text-xl !mt-1">
                    {/* bell */}
                <IconButton color="primary">
                   <Link to='/aswaraDashboard/notifications'><FaBell /></Link>
                </IconButton>
            {/* bell and menu user */}
                <div>
                    <Button
                        id="basic-button"
                        variant='outlined'
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        {currentUser?.name}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                        list: {
                            'aria-labelledby': 'basic-button',
                        },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                        <Stack gap={2}>
                            <Typography>Name : {currentUser?.name}</Typography>
                            <Typography>Email : {currentUser?.email}</Typography>
                            <Typography>phone Number : {currentUser?.phone}</Typography>
                            <Typography>Created at : {currentUser?.created_at.slice(0,10)}</Typography>
                        </Stack>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                                <Logout />
                        </MenuItem>
                    </Menu>
                    </div>

                </div>
        </div>
    );
}
export default NavBar;