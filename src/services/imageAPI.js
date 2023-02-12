import * as axiosClient from './baseAPI';

export const getByteImage = async (url) => {
    return await axiosClient.getData(url);
};
