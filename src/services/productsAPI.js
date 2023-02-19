import * as axiosClient from './baseAPI';

export const getAllProducts = async (params = {}) => {
    return await axiosClient.getData('products/all', params);
};
export const getProductById = async (id) => {
    return await axiosClient.getData(`products/${id}`);
};
export const createProduct = async (productFormData) => {
    return await axiosClient.createFormData('products/add', productFormData);
};
export const updateProduct = async (product) => {
    return await axiosClient.updateFormData('products/update', product);
};
export const deleteProduct = async (id) => {
    return await axiosClient.deleteData(`products/delete/${id}`);
};
