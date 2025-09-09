import logo from '@/assets/Logo.webp';
import { RiCloseLargeFill } from "react-icons/ri";
import { Button, Icon, Collapse, Divider } from "@mui/material";
import { MenuContext } from "@/context/MenuContext";
import { useContext } from "react";
import { staticLinks } from './Links';
import { NavLink } from 'react-router-dom';
import { GetCurrentUser } from '@/hooks/users/useUsers';
import Logout from './Auth/Logout';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
  const { t } = useTranslation();
  const ctxMenu = useContext(MenuContext);
  const { data: currentUser } = GetCurrentUser();
  const sideClassName = `${ctxMenu.showMenu ? 'w-[200px]' : 'w-[70px]'} 
  h-full flex flex-col !p-4 transition-all duration-300 ease-in-out`;

  return (
    <div className={sideClassName}>
      {/* top section */}
      <div>
      <div className='flex lg:hidden justify-end'>
        <Button 
          onClick={() => ctxMenu.toggleMenu()} 
          variant='text'
          size="small"
          sx={{ 
            minWidth: '32px',
            padding: '4px 8px', 
            transition: 'all 0.3s ease',
          }}
        >
          <span className="text-primary text-2xl">
            <Icon><RiCloseLargeFill /></Icon>
          </span>
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
      <ul className='flex flex-col gap-3 !mt-6'>
        {staticLinks.map((link, index) => (
          currentUser?.userType && link.roles.includes(currentUser.userType) && ( 
            <li key={index}>
              <NavLink 
                to={link.path}
                  className={({isActive}) => {
                    return `flex gap-1 !px-3 !py-2 rounded
                      transition-all duration-300 ease-in-out
                      ${isActive
                        ? 'gradient-primary-btn' 
                        : 'text-gray-500 hover:text-secondary-main hover:bg-primary-light   '} 
                      ${ctxMenu.showMenu ? 'w-full' : 'w-10 justify-center'}`;
                  }}
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
                    {t(link.titleKey)}
                  </span>
                </Collapse>
              </NavLink>
            </li>
          )
        ))}
      </ul>
      </div>

      {/* bottom section */}
      {ctxMenu.showMenu && 
      <div className='!mt-auto !mb-2'>
        <Divider className='!mb-2' />
        <Logout />
      </div>}

    </div>
  );
};

export default Sidebar;