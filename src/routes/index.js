import Home from '../pages/Home';
import Shop from '../pages/Shop';

//not login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/shop', component: Shop },
];

//must login
const privateRoutes = [];

export { publicRoutes, privateRoutes };
