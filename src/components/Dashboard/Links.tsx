import { FaUsers, FaPlus, FaProductHunt, FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";

interface Link {
    title: string;
    path: string;
    roles: string[];
    icon: JSX.Element;
}

export const Links: Link[] = [
    {
        title: 'Users',
        path: '/aswaraDashboard/users',
        roles: ['admin'],
        icon: <FaUsers />,
    },
    {
        title: 'Add User',
        path: '/aswaraDashboard/user/add',
        roles: ['admin'],
        icon: <TiUserAdd />
    },
    {
        title: 'Categories',
        path: '/aswaraDashboard/categories',
        roles: ['admin', 'product_manger'],
        icon: <TbCategoryFilled />
    },
    {
        title: 'Add category',
        path: '/aswaraDashboard/category/add',
        roles: ['admin', 'product_manger'],
        icon: <MdCategory />
    },
    {
        title: 'Products',
        path: '/aswaraDashboard/products',
        roles: ['admin', 'product_manger'],
        icon: <FaProductHunt />
    },
    {
        title: 'Add product',
        path: '/aswaraDashboard/product/add',
        roles: ['admin', 'product_manger'],
        icon: <FaPlus />
    },
    {
        title: 'Notifications',
        path: '/aswaraDashboard/notifications',
        roles: ['admin', 'product_manger'],
        icon: <FaBell />
    }
];