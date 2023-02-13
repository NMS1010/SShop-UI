import * as axiosClient from './baseAPI';

export const getAllUsers = async (params = {}) => {
    return await axiosClient.getData('users/all', params);
};
export const getUserById = async (id) => {
    return await axiosClient.getData(`users/${id}`);
};
export const createUser = async (user) => {
    return await axiosClient.createData('users/add', user);
};
export const updateUser = async (user) => {
    return await axiosClient.updateData('users/update', user);
};
export const deleteUser = async (id) => {
    return await axiosClient.deleteData(`users/delete/${id}`);
};
