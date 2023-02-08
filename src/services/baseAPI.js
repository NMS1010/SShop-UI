import axios from 'axios';
import authHeader from '../utils/authHeader';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: authHeader() },
});
export const getData = async (url, params = {}) => {
    axiosClient.interceptors.request.use((config) => {
        config.headers['Authorization'] = authHeader();
        return config;
    });
    const response = await axiosClient.get(url, { params });
    return response.data;
};
