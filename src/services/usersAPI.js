import * as baseAPI from './baseAPI';

export const getAllUsers = async (params = {}) => {
    return await baseAPI.getData('users/all', params);
};
export const getUserById = async (id) => {
    return await baseAPI.getData(`users/${id}`);
};
export const updateUser = async (user) => {
    return await baseAPI.updateFormData('users/update', user);
};
export const deleteUser = async (id) => {
    return await baseAPI.deleteData(`users/delete/${id}`);
};

export const checkEmail = async (email) => {
    return await baseAPI.getData(`users/check-email?email=${email}`);
};
export const checkUsername = async (username) => {
    return await baseAPI.getData(`users/check-username?username=${username}`);
};
export const checkPhone = async (phone) => {
    return await baseAPI.getData(`users/check-phone?phone=${phone}`);
};
