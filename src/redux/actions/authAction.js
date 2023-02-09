import * as types from './types';
import * as authAPI from '../../services/authAPI';
import * as usersAPI from '../../services/usersAPI';
import * as messageAction from './messageAction';
export const login = async (username, password) => {
    const response = await authAPI.login(username, password);
    return async (dispatch) => {
        if (!response || !response?.isSuccess) {
            localStorage.removeItem('token');
            dispatch({
                type: types.LOGIN_FAIL,
            });
            if (!response) {
                console.log(response);
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: 'Cannot connect to server',
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
            } else
                dispatch(
                    messageAction.setMessage({
                        id: Math.random(),
                        title: 'Login',
                        message: response?.errors,
                        backgroundColor: '#d9534f',
                        icon: '',
                    }),
                );
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
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Login',
                    message: response?.errors || 'Error while retrieving user detail',
                    backgroundColor: '#d9534f',
                    icon: '',
                }),
            );
        } else {
            dispatch({
                type: types.LOGIN_SUCCESS,
            });
            dispatch(
                messageAction.setMessage({
                    id: Math.random(),
                    title: 'Login',
                    message: 'Login successfully',
                    backgroundColor: '#5cb85c',
                    icon: '',
                }),
            );
            dispatch({
                type: types.GET_CURRENT_USER,
                payload: {
                    currentUser: response?.data,
                },
            });
        }
    };
};
