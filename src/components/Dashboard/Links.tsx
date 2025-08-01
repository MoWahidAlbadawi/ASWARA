import { FaUsers, FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdDashboard } from 'react-icons/md';
import { LuTableProperties } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
interface Link {
    title: string;
    path: string;
    roles: string[];
    icon: JSX.Element;
}

export const Links: Link[] = [
    {
        title: 'Home',
        path: '/aswaraDashboard/home',
        roles: ['admin'],
        icon: <MdDashboard />,
    },
    {
        title: 'Users',
        path: '/aswaraDashboard/users',
        roles: ['admin'],
        icon: <FaUsers />,
    },
    {
        title: 'Categories',
        path: '/aswaraDashboard/categories',
        roles: ['admin', 'product_manger'],
        icon: <TbCategoryFilled />
    },
    {
        title: 'Products',
        path: '/aswaraDashboard/products',
        roles: ['admin', 'product_manger'],
        icon: <LuTableProperties />
    },
    {
        title: 'Notifications',
        path: '/aswaraDashboard/notifications',
        roles: ['admin', 'product_manger'],
        icon: <FaBell />
    },
    {
        title : 'Profile',
        path: '/aswaraDashboard/profile',
        roles: ['admin', 'product_manger'],
        icon: <CgProfile />
    }
];