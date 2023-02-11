import * as axiosClient from './baseAPI';

export const getAllCategories = async (params = {}) => {
    try {
        let res = await axiosClient.getData('categories/all', params);
        return res;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const createCategory = async (category) => {
    return await axiosClient.createData('categories/add', category);
};
export const updateCategory = async (category) => {
    return await axiosClient.updateData('categories/update', category);
};
