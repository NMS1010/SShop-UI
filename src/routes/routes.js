import { Home, Shop } from '../pages/Client';
import { Dashboard, User } from '../pages/Admin';
import { AdminLayout, ClientLayout } from '../layouts';
import config from '../configs/index';
import Category from '../pages/Admin/Category';
//not login
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: ClientLayout },
    { path: config.routes.shop, component: Shop, layout: ClientLayout },
];

//must login
const privateRoutes = [
    { path: config.routes.admin_home, component: Dashboard, layout: AdminLayout },
    { path: config.routes.admin_users, component: User, layout: AdminLayout },
    { path: config.routes.admin_categories, component: Category, layout: AdminLayout },
];

const routes = [...publicRoutes, ...privateRoutes];
export default routes;
