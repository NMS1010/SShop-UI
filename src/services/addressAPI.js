import * as baseAPI from './baseAPI';

export const getAllAddresses = async (params = {}) => {
    return await baseAPI.getData('addresses/all', params);
};
export const getAddressById = async (id) => {
    return await baseAPI.getData(`addresses/${id}`);
};
export const getAddressByUserId = async (userId) => {
    return await baseAPI.getData(`addresses/address/${userId}`);
};
export const createAddress = async (deliveryMethod) => {
    return await baseAPI.createFormData('addresses/add', deliveryMethod);
};
export const updateAddress = async (deliveryMethod) => {
    return await baseAPI.updateFormData('addresses/update', deliveryMethod);
};
export const deleteAddress = async (id) => {
    return await baseAPI.deleteData(`addresses/delete/${id}`);
};
