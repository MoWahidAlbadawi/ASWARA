import { SlMenu } from "react-icons/sl";
import { IconButton , Menu , MenuItem , Button , Divider, Typography , Icon , Box} from "@mui/material";
// context to mange menu 
import { useContext,useState } from "react";
import { MenuContext } from "@/context/MenuContext";
import { GetCurrentUser } from "@/hooks/users/useUsers";
import { FaBell } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdNavigateNext, MdLanguage } from "react-icons/md";
import { Link } from "react-router-dom";
// logout component
import Logout from "./Auth/Logout";
// Translation
import { useTranslation } from "react-i18next";

const NavBar = () => {
    const { t , i18n } = useTranslation();
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

    // Language menu states and functions
    const [languageAnchorEl, setLanguageAnchorEl] = useState<null | HTMLElement>(null);
    const languageOpen = Boolean(languageAnchorEl);
    const handleLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setLanguageAnchorEl(event.currentTarget);
    };
    const handleLanguageClose = () => {
        setLanguageAnchorEl(null);
    };

    // Language change handler
    const handleLanguageChange = (language: string) => {
        i18n.changeLanguage(language);
        handleLanguageClose();
    };

    // Available languages - customize these based on your supported languages
    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    ];

    
    return (
        <div className="flex justify-between !p-4 text-primary-main">
            <div className="flex">
                {/* menu */}
                <IconButton className="text-xl" color="primary" onClick={() => ctxMenu.toggleMenu()}>
                    <SlMenu />
                </IconButton>
            </div>  
             {/* bell, language selector, and menu user */}
                <div className="flex gap-2 text-xl !mt-1">
                    
                    {/* Language Selector */}
                    <IconButton 
                        color="primary"
                        onClick={handleLanguageClick}
                        aria-controls={languageOpen ? 'language-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={languageOpen ? 'true' : undefined}
                    >
                        <MdLanguage />
                    </IconButton>
                    <Menu
                        id="language-menu"
                        anchorEl={languageAnchorEl}
                        open={languageOpen}
                        onClose={handleLanguageClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'language-button',
                            },
                        }}
                    >
                        <MenuItem disabled>
                            <Typography variant="subtitle2" color="textSecondary">
                                {t('selectLanguage', 'Select Language')}
                            </Typography>
                        </MenuItem>
                        <Divider />
                        {languages.map((language) => (
                            <MenuItem 
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                selected={i18n.language === language.code}
                            >
                                <Box className="flex items-center gap-2">
                                    <span>{language.flag}</span>
                                    <Typography>{language.name}</Typography>
                                    {i18n.language === language.code && (
                                        <Icon color="primary" className="ml-auto">
                                            <MdNavigateNext />
                                        </Icon>
                                    )}
                                </Box>
                            </MenuItem>
                        ))}
                    </Menu>
                    {/* bell */}
                    <IconButton color="primary">
                       <Link to='/notifications'><FaBell /></Link>
                    </IconButton>

                    {/* User menu */}
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
                         <Link to='/profile'>
                            <Box className='flex gap-2'>
                                <Icon color="primary"><CiUser /></Icon>
                                <Typography className="!me-12">{t('navigation.profile')}</Typography>
                                <Icon color="primary"><MdNavigateNext /></Icon>
                                </Box>
                                </Link>
                            </MenuItem>
                            <Divider />
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