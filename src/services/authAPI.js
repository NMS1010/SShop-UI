import { axiosClient } from './baseAPI';

export const login = async (username, password) => {
    try {
        const response = await axiosClient.postForm('users/login', { username, password });
        return response.data;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const register = () => {};
