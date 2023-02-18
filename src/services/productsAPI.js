import * as axiosClient from './baseAPI';

export const getAllProducts = async (params = {}) => {
    return await axiosClient.getData('products/all', params);
};
export const getProductById = async (id) => {
    return await axiosClient.getData(`products/${id}`);
};
export const createProduct = async (product) => {
    return await axiosClient.createData('products/add', product);
};
export const updateProduct = async (product) => {
    return await axiosClient.updateData('products/update', product);
};
export const deleteProduct = async (id) => {
    return await axiosClient.deleteData(`products/delete/${id}`);
};
