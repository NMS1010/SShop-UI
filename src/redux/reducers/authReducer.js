import * as types from '../actions/types';
const initialState = {
    currentUser: null,
    isLogin: localStorage.getItem('token') && localStorage.getItem('token') > 100 ? true : false,
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload.currentUser, isLogin: true };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                isLogin: true,
            };
        case types.LOGIN_FAIL:
            return {
                ...state,
                isLogin: false,
            };
        default:
            return state;
    }
};
export default authReducer;
