import * as baseAPI from './baseAPI';

export const getAllUserOrders = async (params = {}) => {
    return await baseAPI.getData('orders/user-orders', params);
};
export const getAllOrders = async (params = {}) => {
    return await baseAPI.getData('orders/all', params);
};
export const getOrderById = async (id) => {
    return await baseAPI.getData(`orders/${id}`);
};
export const createOrder = async (order) => {
    return await baseAPI.createFormData('orders/add', order);
};
