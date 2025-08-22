import { FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdDashboard } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import {  Users, Package, ShoppingCart } from "lucide-react"
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
        icon: <Users />,
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
        icon: <Package />
    },
    {
        title : 'Orders',
        path: '/orders',
        roles: ['admin'],
        icon: <ShoppingCart />
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