import * as axiosClient from './baseAPI';

export const getAllCategories = async (params = {}) => {
    try {
        let res = await axiosClient.getData('categories/all', params);
        return res.data;
    } catch (error) {
        console.log(error);
        return false;
    }
};
