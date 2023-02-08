import * as types from './types';

export const setMessage = (message) => {
    return {
        type: types.SET_MESSAGE,
        payload: message,
    };
};
export const clearMessage = () => {
    return {
        type: types.CLEAR_MESSAGE,
    };
};
