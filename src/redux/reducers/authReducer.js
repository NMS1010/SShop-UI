import * as types from '../actions/types';
const initialState = {
    accessToken: localStorage.getItem('token'),
    currentUser: localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')),
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, accessToken: action.payload.accessToken };

        case types.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload.currentUser };

        default:
            return state;
    }
};
export default authReducer;
