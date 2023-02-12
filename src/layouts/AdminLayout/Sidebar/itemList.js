import dashboardIcon from '../../../assets/images/admin/icons/dashboard.svg';
import userIcon from '../../../assets/images/admin/icons/user.svg';
import categoryIcon from '../../../assets/images/admin/icons/category.svg';
import brandIcon from '../../../assets/images/admin/icons/brand.svg';
import config from '../../../configs';

const sideBarItemList = [
    {
        path: config.routes.admin_home,
        content: 'Dashboard',
        icon: dashboardIcon,
    },
    {
        path: config.routes.admin_categories,
        content: 'Categories',
        icon: categoryIcon,
    },
    {
        path: config.routes.admin_users,
        content: 'Users',
        icon: userIcon,
    },
    {
        path: config.routes.admin_brands,
        content: 'Brands',
        icon: brandIcon,
    },
];

export default sideBarItemList;
