import * as baseAPI from './baseAPI';

export const getAllUsers = async (params = {}) => {
    return await baseAPI.getData('users/all', params);
};
export const getUserById = async (id) => {
    return await baseAPI.getData(`users/${id}`);
};
export const createUser = async (user) => {
    return await baseAPI.createData('users/add', user);
};
export const updateUser = async (user) => {
    return await baseAPI.updateData('users/update', user);
};
export const deleteUser = async (id) => {
    return await baseAPI.deleteData(`users/delete/${id}`);
};
