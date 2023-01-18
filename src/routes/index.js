import Home from '../pages/Client/Home';
import Shop from '../pages/Client/Shop';
import AdminHome from '../pages/Admin/AdminHome';
import AdminLayout from '../components/Layout/AdminLayout';
import ClientLayout from '../components/Layout/ClientLayout';

//not login
const publicRoutes = [
    { path: '/', component: Home, layout: ClientLayout },
    { path: '/shop', component: Shop, layout: ClientLayout },
    { path: '/admin/', component: AdminHome, layout: AdminLayout },
];

//must login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
