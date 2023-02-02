import * as httpReq from './baseAPI';

export const getAllCategories = async (params = {}) => {
    try {
        let res = await httpReq.getData('categories/all', params);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
