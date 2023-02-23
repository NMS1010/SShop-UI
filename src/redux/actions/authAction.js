import * as types from './types';
import * as authAPI from '../../services/authAPI';
import * as usersAPI from '../../services/usersAPI';
import * as messageAction from './messageAction';
import jwtDecode from 'jwt-decode';
export const login = async (username, password) => {
    const response = await authAPI.login(username, password);
    return async (dispatch) => {
        if (!response || !response?.isSuccess) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({
                type: types.LOGIN_FAIL,
            });
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Login',
                    message: response?.errors || 'Cannot connect to server',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            let { accessToken, refreshToken } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            let success = await dispatch(await getCurrentUser());
            if (success) {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: 'Login successfully',
                        backgroundColor: '#5cb85c',
                        icon: '',
                    }),
                );
            } else {
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: 'Failed to login',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            }
        }
    };
};
export const logout = async () => {
    let token = localStorage.getItem('accessToken');
    if (token) {
        let jwtDecodeObj = jwtDecode(token);
        let nameIdentifier = Object.keys(jwtDecodeObj).find((val) => val.includes('nameidentifier'));
        let userId = jwtDecodeObj[nameIdentifier];
        await authAPI.revokeToken(userId);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }
    return {
        type: types.LOGOUT,
    };
};

export const getCurrentUser = async () => {
    let token = localStorage.getItem('accessToken');
    let id = null;
    if (token) {
        let jwtDecodeObj = jwtDecode(token);
        let nameIdentifier = Object.keys(jwtDecodeObj).find((val) => val.includes('nameidentifier'));
        id = jwtDecodeObj[nameIdentifier];
    }
    const response = await usersAPI.getUserById(id);
    return async (dispatch) => {
        if (!response || !response?.isSuccess) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({
                type: types.LOGIN_FAIL,
            });
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Login',
                    message: response?.errors || 'Error while getting user profile',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
            return false;
        } else {
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: {
                    currentUser: response?.data,
                },
            });
            return true;
        }
    };
};
