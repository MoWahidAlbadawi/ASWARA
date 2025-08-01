import { SlMenu } from "react-icons/sl";
import { IconButton , Menu , MenuItem , Button , Divider,Typography , Icon , Box} from "@mui/material";
// context to mange menu 
import { useContext,useState } from "react";
import { MenuContext } from "@/context/MenuContext";
import { GetCurrentUser } from "@/hooks/users/useUsers";
import { FaBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
// logout component
import Logout from "./Auth/Logout";
const NavBar = () => {
    // menu context for control with sidebar
    const ctxMenu = useContext(MenuContext);
    // current user
    const {data : currentUser} = GetCurrentUser();
    // menu functions and states for show current user info
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
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
                     <Link to='/aswaraDashboard/profile'>
                        <Box className='flex gap-2'>
                            <Icon color="primary"><CiUser /></Icon>
                            <Typography className="!me-12">Profile</Typography>
                            <Icon color="primary"><MdNavigateNext /></Icon>
                            </Box>
                            </Link>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                        </MenuItem>
                        <MenuItem>
                                <Logout onCloseDialog={handleClose}/>
                        </MenuItem>
                    </Menu>
                    </div>

                </div>
        </div>
    );
}
export default NavBar;