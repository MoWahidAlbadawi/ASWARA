import { SlMenu } from "react-icons/sl";
import { IconButton } from "@mui/material";
// context to mange menu 
import { useContext } from "react";
import { MenuContext } from "@/context/MenuContext";
const NavBar = () => {
    const ctxMenu = useContext(MenuContext);
    return (
        <div className="flex justify-between !p-4 text-primary-main">
            <div >
                <IconButton className="text-xl" color="primary" onClick={() => ctxMenu.toggleMenu()}>
                    <SlMenu />
                </IconButton>
            </div>  
                <div className="text-xl !mt-1">
                <p>Logout</p>
                </div>
        </div>
    );
}
export default NavBar;