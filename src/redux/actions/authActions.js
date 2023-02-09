import * as types from './types';
import * as authAPI from '../../services/authAPI';
import * as usersAPI from '../../services/usersAPI';
export const login = async (username, password) => {
    const response = await authAPI.login(username, password);
    return async (dispatch) => {
        if (!response || !response?.isSuccess) {
            localStorage.removeItem('token');
            dispatch({
                type: types.LOGIN_FAIL,
            });
            if (!response) {
                dispatch({
                    type: types.SET_MESSAGE,
                    payload: 'Cannot connect to server',
                });
            } else
                dispatch({
                    type: types.SET_MESSAGE,
                    payload: response?.errors,
                });
        } else {
            localStorage.setItem('token', response.data);
        }
    };
};
export const logout = () => {
    localStorage.removeItem('token');
    return {
        type: types.LOGOUT,
    };
};
export const getCurrentUser = async (id) => {
    const response = await usersAPI.getUserById(id);
    return async (dispatch) => {
        if (!response || !response?.isSuccess) {
            localStorage.removeItem('token');
            dispatch({
                type: types.LOGIN_FAIL,
            });
            dispatch({
                type: types.SET_MESSAGE,
                payload: response?.errors || 'Error while retrieving user detail',
            });
        } else {
            dispatch({
                type: types.LOGIN_SUCCESS,
            });
            dispatch({
                type: types.SET_MESSAGE,
                payload: 'Login successfully',
            });
            dispatch({
                type: types.GET_CURRENT_USER,
                payload: {
                    currentUser: response?.data,
                },
            });
        }
    };
};
