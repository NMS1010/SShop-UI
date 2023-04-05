const client = {
    home: '/',
    shop: '/shop',
    auth: '/auth',
    signup: '/signup',
    forbidden: '/forbidden',
    cart: '/cart',
    wish_list: '/wish-list',
    product_detail: '/products/:productId',
};
const admin = {
    admin_home: '/admin/',
    admin_users: '/admin/users',
    admin_roles: '/admin/roles',
    admin_categories: '/admin/categories',
    admin_brands: '/admin/brands',
    admin_profile: '/admin/profile',
    admin_products: '/admin/products',
};
const routes = {
    ...client,
    ...admin,
};
export default routes;
