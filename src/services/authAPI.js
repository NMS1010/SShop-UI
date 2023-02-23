import * as baseAPI from './baseAPI';

export const login = async (username, password) => {
    return await baseAPI.createData('users/login', { username, password });
};

export const refreshToken = async (accessToken, refreshToken) => {
    let formData = new FormData();
    formData.append('accessToken', accessToken);
    formData.append('refreshToken', refreshToken);
    return await baseAPI.createFormData('users/refresh-token', formData);
};
export const revokeToken = async (userId) => {
    return await baseAPI.createData(`users/revoke-token/${userId}`, {});
};
export const register = () => {};
