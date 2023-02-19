import axios from 'axios';
import { authHeader } from '../utils';

export const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { Authorization: authHeader() },
});
export const addTokenHeader = () => {
    axiosClient.interceptors.request.use((config) => {
        config.headers['Authorization'] = authHeader();
        return config;
    });
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        function (error) {
            return Promise.reject(error.response);
        },
    );
};
export const getData = async (url, params = {}) => {
    addTokenHeader();
    try {
        const response = await axiosClient.get(url, { params });
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};

export const deleteData = async (url) => {
    addTokenHeader();
    try {
        const response = await axiosClient.delete(url);
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};
export const createFormData = async (url, formData) => {
    axiosClient.addTokenHeader();
    try {
        let response = await axiosClient.axiosClient.postForm(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};
export const createData = async (url, obj) => {
    addTokenHeader();
    try {
        let response = await axiosClient.postForm(
            url,
            { ...obj },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};
export const updateFormData = async (url, formData) => {
    addTokenHeader();
    try {
        let response = await axiosClient.putForm(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};
export const updateData = async (url, obj) => {
    addTokenHeader();
    try {
        let response = await axiosClient.putForm(
            url,
            { ...obj },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response.data;
    } catch (error) {
        if (!error.response || error.response.status === 401) {
            localStorage.removeItem('token');
            return 401;
        }
        return false;
    }
};
