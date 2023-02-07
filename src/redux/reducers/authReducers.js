import * as types from '../actions/types';
const initialState = {};
export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return { ...state, accessToken: action.payload.accessToken };

        case types.GET_CURRENT_USER:
            return { ...state, currentUser: action.payload.currentUser };

        default:
            return state;
    }
}
