const client = {
    home: '/',
    shop: '/shop',
    auth: '/auth',
    signup: '/signup',
};
const admin = {
    admin_home: '/admin/',
    admin_users: '/admin/users',
    admin_roles: '/admin/roles',
    admin_categories: '/admin/categories',
    admin_brands: '/admin/brands',
    admin_login: '/admin/login',
    admin_profile: '/admin/profile',
    admin_products: '/admin/products',
};
const routes = {
    ...client,
    ...admin,
};
export default routes;
