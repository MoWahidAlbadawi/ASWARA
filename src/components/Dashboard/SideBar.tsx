// menu context
import { MenuContext } from "@/context/MenuContext";
import { useContext } from "react";
const Sidebar = () => {
        const ctxMenu = useContext(MenuContext);
        const mainClasses = `${ctxMenu.showMenu ? '!p-24' : '!p-8'} transition-all duration-300`;
    return <div className={mainClasses}>
        <p>test</p>
    </div>
}
export default Sidebar;