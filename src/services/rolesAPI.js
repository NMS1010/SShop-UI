import * as axiosClient from './baseAPI';

export const getAllRoles = async (params = {}) => {
    return await axiosClient.getData('roles/all', params);
};
export const getRoleById = async (id) => {
    return await axiosClient.getData(`roles/${id}`);
};
export const createRole = async (role) => {
    return await axiosClient.createData('roles/add', role);
};
export const updateRole = async (role) => {
    return await axiosClient.updateData('roles/update', role);
};
export const deleteRole = async (id) => {
    return await axiosClient.deleteData(`roles/delete/${id}`);
};
