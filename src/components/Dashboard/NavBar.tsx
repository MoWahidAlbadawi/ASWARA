import { SlMenu } from "react-icons/sl";
import { IconButton , Menu , MenuItem ,Badge ,  Button , Divider, Typography , Icon , Box, Chip} from "@mui/material";
// context to mange menu 
import { useContext,useEffect,useState } from "react";
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
import { GetAllUnReadNotifications, ReadAllNotifications, ReadNotification } from "@/hooks/notification/useNotification";
import toast from "react-hot-toast";

const NavBar = () => {
    const { t , i18n } = useTranslation();
    // menu context for control with sidebar
    const ctxMenu = useContext(MenuContext);
    // current user
    const {data : currentUser} = GetCurrentUser();
    // unread notifications
        const {data : unreadNotificationsList , refetch} =  GetAllUnReadNotifications();
        // read
        const {mutate : read ,  isSuccess : isSuccessRead} = ReadNotification(); 
        // read all
        const { mutate : readAll , isSuccess : isSuccessReadAll } = ReadAllNotifications();
    
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

        // unread notificaitons menu states and functions
    const [unreadNotificationsAnchorEl, setUnreadNotificationsAnchorEl] = useState<null | HTMLElement>(null);
    const unreadNotificationsOpen = Boolean(unreadNotificationsAnchorEl);
    const handleUnreadNotificationsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setUnreadNotificationsAnchorEl(event.currentTarget);
    };
    const handleUnreadNotificationsClose = () => {
            setUnreadNotificationsAnchorEl(null);
    };


    async function readNotification (id : string) {
        await read(id);
        refetch();
    }
    async function readAllNotifications () {
        await readAll();
        refetch();
    }

    useEffect(() => {
        if(isSuccessRead) {
            toast.success(t('notifications.readSuccess', 'تم قراءة الاشعار بنجاح'));
            handleUnreadNotificationsClose()
    }
        if(isSuccessReadAll) {
            toast.success(t('notifications.readAllSuccess', 'تم قراءة جميع الاشعار بنجاح'));
            handleUnreadNotificationsClose()
    }

},[isSuccessRead, t])

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
                                {t('selectLanguage')}
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
                    {/* un read notifications */}
            <IconButton
                    color="primary"
                    onClick={handleUnreadNotificationsClick}
                    aria-controls={unreadNotificationsOpen ? 'unread-notification-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={unreadNotificationsOpen ? 'true' : undefined}
                >
                        <Badge
                         badgeContent={unreadNotificationsList?.length || 0}
                            color="error"
                            >
                            <FaBell />
                        </Badge>

                    </IconButton>
                    <Menu
                        id="language-menu"
                        anchorEl={unreadNotificationsAnchorEl}
                        open={unreadNotificationsOpen}
                        onClose={handleUnreadNotificationsClose}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'unread-notifications-button',
                            },
                        }}
                    >        
                        {unreadNotificationsList?.map((notification) => (
                            notification.data.title && (
                            <div key={notification.id} className="bg-yellow-50 relative w-[250px]">
                            <MenuItem 
                            className="flex flex-col"
                            onClick={() => readNotification(notification.id)}
                            >
                                    <Typography>{notification.data.title}</Typography>  
                                    <Typography className="text-gray-400 !text-sm">{notification.created_at.split('T')[0]}</Typography>
                                    <Typography className="text-gray-400 !text-sm">{notification.created_at.split('T')[1].slice(0,5)}</Typography>
                                    <Chip
                                    className="absolute bottom-[1px] start-[10px]"
                                        label={t('notifications.new')}
                                        size="small"
                                        color="success"
                                        />
                            </MenuItem>
                               <Divider />
                               </div>)
                        ))}
                         <MenuItem className="w-full" onClick={readAllNotifications}>
                                <Button className="w-full !text-[16px] !text-white" variant={'contained'}>
                                    {t('notifications.readAll')}
                                </Button>
                            </MenuItem>
                    </Menu>


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