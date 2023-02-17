import { Home, Shop } from '../pages/Client';
import { Dashboard, User, Login, Brand } from '../pages/Admin';
import { AdminLayout, ClientLayout } from '../layouts';
import config from '../configs/index';
import Category from '../pages/Admin/Category';
import Profile from '../pages/Admin/User/Profile';
//not login
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.shop, component: Shop, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.admin_login, component: Login, layout: null, private: false, roles: [] },
];

//must login
const privateRoutes = [
    { path: config.routes.admin_home, component: Dashboard, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_users, component: User, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_categories, component: Category, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_brands, component: Brand, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_profile, component: Profile, layout: AdminLayout, private: true, roles: ['admin'] },
];

const routes = [...publicRoutes, ...privateRoutes];
export default routes;
