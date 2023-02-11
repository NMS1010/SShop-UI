import * as axiosClient from './baseAPI';

export const getAllCategories = async (params = {}) => {
    return await axiosClient.getData('categories/all', params);
};
export const getCategoryById = async (id) => {
    return await axiosClient.getData(`categories/${id}`);
};
export const createCategory = async (category) => {
    return await axiosClient.createData('categories/add', category);
};
export const updateCategory = async (category) => {
    return await axiosClient.updateData('categories/update', category);
};
export const deleteCategory = async (id) => {
    return await axiosClient.deleteData(`categories/delete/${id}`);
};
