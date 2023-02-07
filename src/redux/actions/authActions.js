import * as types from './types';
import * as authAPI from '../../services/authAPI';
import * as usersAPI from '../../services/usersAPI';
export const login = async (username, password) => {
    const response = await authAPI.login(username, password);
    return async (dispatch) => {
        dispatch({
            type: types.LOGIN,
            payload: {
                accessToken: response.data,
            },
        });
    };
};

export const getCurrentUser = async (id) => {
    const response = await usersAPI.getUserById(id);
    return async (dispatch) => {
        dispatch({
            type: types.GET_CURRENT_USER,
            payload: {
                currentUser: response.data,
            },
        });
    };
};
