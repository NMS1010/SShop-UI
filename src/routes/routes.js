import { Home, Shop } from '../pages/Client';
import { AdminHome } from '../pages/Admin';
import { AdminLayout, ClientLayout } from '../layouts';
import config from '../configs/index';
//not login
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: ClientLayout },
    { path: config.routes.shop, component: Shop, layout: ClientLayout },
];

//must login
const privateRoutes = [{ path: config.routes.admin_home, component: AdminHome, layout: AdminLayout }];

const routes = [...publicRoutes, ...privateRoutes];
export default routes;
