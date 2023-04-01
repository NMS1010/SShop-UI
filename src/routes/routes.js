import { Home, Shop, Login, Register, Cart } from '../pages/Client';
import { Dashboard, User, Brand, Category, Product, Profile, Role, Forbidden } from '../pages/Admin';
import { AdminLayout, ClientLayout } from '../layouts';
import config from '../configs/index';
//not login
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.shop, component: Shop, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.auth, component: Login, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.signup, component: Register, layout: ClientLayout, private: false, roles: [] },
    { path: config.routes.forbidden, component: Forbidden, layout: null, private: false, roles: [] },
];

//must login
const privateRoutes = [
    { path: config.routes.admin_home, component: Dashboard, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_users, component: User, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_roles, component: Role, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_categories, component: Category, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_brands, component: Brand, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_profile, component: Profile, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.admin_products, component: Product, layout: AdminLayout, private: true, roles: ['admin'] },
    { path: config.routes.cart, component: Cart, layout: ClientLayout, private: true, roles: ['customer'] },
];

const routes = [...publicRoutes, ...privateRoutes];
export default routes;
