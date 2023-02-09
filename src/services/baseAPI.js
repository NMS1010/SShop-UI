import axios from 'axios';
import authHeader from '../utils/authHeader';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: authHeader() },
});
const addTokenHeader = () => {
    axiosClient.interceptors.request.use((config) => {
        config.headers['Authorization'] = authHeader();
        return config;
    });
};
export const getData = async (url, params = {}) => {
    addTokenHeader();
    const response = await axiosClient.get(url, { params });
    if (response.status === 401) {
        localStorage.removeItem('token');
    }
    return response.data;
};
export const createData = async (url, obj) => {
    addTokenHeader();
    let response = await axiosClient.postForm(
        url,
        { ...obj },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        },
    );
    if (response.status === 401) {
        localStorage.removeItem('token');
    }
    return response.data;
};
