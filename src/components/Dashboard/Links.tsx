import { FaUsers, FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdDashboard } from 'react-icons/md';
import { LuTableProperties } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { IoMdGitPullRequest } from "react-icons/io";
interface Link {
    title: string;
    path: string;
    roles: string[];
    icon: JSX.Element;
}

export const Links: Link[] = [
    {
        title: 'Home',
        path: '/home',
        roles: ['admin'],
        icon: <MdDashboard />,
    },
    {
        title: 'Users',
        path: '/users',
        roles: ['admin'],
        icon: <FaUsers />,
    },
    {
        title: 'Categories',
        path: '/categories',
        roles: ['admin', 'product_manager'],
        icon: <TbCategoryFilled />
    },
    {
        title: 'Products',
        path: '/products',
        roles: ['admin', 'product_manager'],
        icon: <LuTableProperties />
    },
    {
        title : 'Orders',
        path: '/orders',
        roles: ['admin'],
        icon: <IoMdGitPullRequest />
    },
    {
        title: 'Notifications',
        path: '/notifications',
        roles: ['admin', 'product_manager'],
        icon: <FaBell />
    },
    {
        title : 'Profile',
        path: '/profile',
        roles: ['admin', 'product_manager'],
        icon: <CgProfile />
    }
];