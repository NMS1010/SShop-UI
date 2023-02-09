import * as types from '../actions/types';
const initialState = [];
const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MESSAGE:
            return [...state, action.payload];

        case types.CLEAR_MESSAGE:
            return state.filter((message) => message.id !== action.payload);

        default:
            return state;
    }
};
export default messageReducer;
