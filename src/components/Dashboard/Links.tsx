import { FaUsers, FaPlus, FaProductHunt, FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";

interface Link {
    title: string;
    path: string;
    roles: string[];
    icon: JSX.Element;
}

export const Links: Link[] = [
    {
        title: 'Users',
        path: '/jewelryDashboard/users',
        roles: ['admin'],
        icon: <FaUsers />,
    },
    {
        title: 'Add User',
        path: '/jewelryDashboard/user/add',
        roles: ['admin'],
        icon: <FaPlus />
    },
    {
        title: 'Categories',
        path: '/jewelryDashboard/categories',
        roles: ['admin', 'product_manger'],
        icon: <TbCategoryFilled />
    },
    {
        title: 'Add category',
        path: '/jewelryDashboard/category/add',
        roles: ['admin', 'product_manger'],
        icon: <FaPlus />
    },
    {
        title: 'Products',
        path: '/jewelryDashboard/products',
        roles: ['admin', 'product_manger'],
        icon: <FaProductHunt />
    },
    {
        title: 'Add product',
        path: '/jewelryDashboard/product/add',
        roles: ['admin', 'product_manger'],
        icon: <FaPlus />
    },
    {
        title: 'Notifications',
        path: '/jewelryDashboard/notifications',
        roles: ['admin', 'product_manger'],
        icon: <FaBell />
    }
];