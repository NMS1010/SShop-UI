import * as axiosClient from './baseAPI';
export const getUserById = async (id) => {
    try {
        const response = await axiosClient.getData(`users/${id}`);
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
};
