import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
export const getData = async (url, params = {}) => {
    const response = await axiosClient.get(url, { params });
    return response.data;
};
