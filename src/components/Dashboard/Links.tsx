import { FaBell } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { MdDashboard } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { ClipboardList , Users, Package, ShoppingCart } from "lucide-react";
interface Link {
    titleKey: string; 
    path: string;
    roles: string[];
    icon: JSX.Element;
}

// Static links configuration with translation keys
export const staticLinks: Link[] = [
    {
        titleKey: 'navigation.home',
        path: '/home',
        roles: ['admin'],
        icon: <MdDashboard />,
    },
    {
        titleKey: 'navigation.users',
        path: '/users',
        roles: ['admin'],
        icon: <Users />,
    },
    {
        titleKey: 'navigation.categories',
        path: '/categories',
        roles: ['admin', 'product_manager'],
        icon: <TbCategoryFilled />
    },
    {
        titleKey: 'navigation.products',
        path: '/products',
        roles: ['admin', 'product_manager'],
        icon: <Package />
    },
    {
         titleKey: 'navigation.reviewRequests',
        path: '/reviewRequests',
        roles: ['admin', 'product_manager'],
        icon: <ClipboardList />
    },
    {
        titleKey: 'navigation.orders',
        path: '/orders',
        roles: ['admin', 'product_manager'],
        icon: <ShoppingCart />
    },
    {
        titleKey: 'navigation.notifications',
        path: '/notifications',
        roles: ['admin', 'product_manager'],
        icon: <FaBell />
    },
    {
        titleKey: 'navigation.profile',
        path: '/profile',
        roles: ['admin', 'product_manager'],
        icon: <CgProfile />
    }
];

