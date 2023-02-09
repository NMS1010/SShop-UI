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
    try {
        let res = await axiosClient.createData('categories/add', category);
        return res?.isSuccess;
    } catch (error) {
        console.log(error);
        return false;
    }
};
