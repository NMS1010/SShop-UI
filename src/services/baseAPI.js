import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
export const getData = async (url, opts = {}) => {
    const response = await httpRequest.get(url, opts);
    return response.data;
};
