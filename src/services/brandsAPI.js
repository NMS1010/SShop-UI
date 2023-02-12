import * as axiosClient from './baseAPI';

export const getAllBrands = async (params = {}) => {
    return await axiosClient.getData('brands/all', params);
};
export const getBrandById = async (id) => {
    return await axiosClient.getData(`brands/${id}`);
};
export const createBrand = async (brand) => {
    return await axiosClient.createData('brands/add', brand);
};
export const updateBrand = async (brand) => {
    return await axiosClient.updateData('brands/update', brand);
};
export const deleteBrand = async (id) => {
    return await axiosClient.deleteData(`brands/delete/${id}`);
};
