import logo from '@/assets/Logo.png';
import { Button, Icon, Collapse } from "@mui/material";
import { MenuContext } from "@/context/MenuContext";
import { useContext } from "react";
import { Links } from './Links';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '@/hooks/users/useUsers';

const Sidebar = () => {
  const ctxMenu = useContext(MenuContext);
  const { data: currentUser } = getCurrentUser();

  return (
    <div className='!p-4 transition-all duration-300 ease-in-out'>
      <div className='!mb-6 flex md:hidden justify-end'>
        <Button 
          onClick={() => ctxMenu.toggleMenu()} 
          variant="contained"
          size="small"
          sx={{ 
            minWidth: '32px',
            padding: '4px 8px', 
            transition: 'all 0.3s ease',
          }}
        >
          <span className="text-white">X</span>
        </Button>
      </div>
      
          {ctxMenu.showMenu &&
        <div>
          <img 
            src={logo} 
            width={200} 
            alt="Logo" 
          />
        </div>}

      {/* Navigation with staggered transitions */}
      <ul className='flex flex-col gap-5 !mt-10'>
        {Links.map((link, index) => (
          currentUser?.userType && link.roles.includes(currentUser.userType) && ( 
            <li key={index}>
              <NavLink 
                to={link.path}
                className={({isActive}) => `
                  flex gap-1 !px-3 !py-1 rounded
                  transition-all duration-300 ease-in-out
                  ${isActive 
                    ? 'bg-primary-main text-white' 
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}
                  ${ctxMenu.showMenu ? 'w-full' : 'w-10 justify-center'}
                `}
                style={{
                  transitionDelay: `${ctxMenu.showMenu ? index * 50 : 0}ms`
                }}
              >   
                <Icon className="transition-transform duration-300 hover:scale-110">
                  {link.icon}
                </Icon>
                <Collapse 
                  in={ctxMenu.showMenu} 
                  orientation="horizontal"
                  timeout={300}
                  unmountOnExit
                >
                  <span className="whitespace-nowrap">
                    {link.title}
                  </span>
                </Collapse>
              </NavLink>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;