const client = {
    home: '/',
    shop: '/shop',
};
const admin = {
    admin_home: '/admin/',
    admin_users: '/admin/users',
    admin_categories: '/admin/categories',
    admin_brands: '/admin/brands',
    admin_login: '/admin/login',
};
const routes = {
    ...client,
    ...admin,
};
export default routes;
