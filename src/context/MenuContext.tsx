import React, { createContext , useState } from "react";

interface Menu {
    showMenu : boolean
    toggleMenu : () => void
}

interface Props {
    children : React.ReactNode;
}

export const MenuContext = createContext<Menu>({
    showMenu : false,
    toggleMenu : () => {},
})

export const MenuContextProvider = ({children} : Props) => {

    const [showMenu , setShowMenu] = useState<boolean>(false);

    function toggleMenu () : void {
        setShowMenu(prev => !prev);
    }

    return <MenuContext.Provider value={{
        showMenu,
        toggleMenu,
    }}>
        { children }
    </MenuContext.Provider>
}
