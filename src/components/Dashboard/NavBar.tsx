import { SlMenu } from "react-icons/sl";
import { IconButton } from "@mui/material";
// context to mange menu 
import { useContext, useEffect } from "react";
import { MenuContext } from "@/context/MenuContext";
import { getCurrentUser } from "@/hooks/users/useUser";
const NavBar = () => {
    const ctxMenu = useContext(MenuContext);
    const {data : currentUser , isLoading , error} = getCurrentUser();
    useEffect(() => {
        console.log(currentUser);
},[currentUser])
    return (
        <div className="flex justify-between !p-4 text-primary-main">
            <div className="flex">
                <p>{currentUser?.name}s</p>
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