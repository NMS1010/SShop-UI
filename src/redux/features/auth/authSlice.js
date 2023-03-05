import { createSlice } from '@reduxjs/toolkit';
import { login, logout, getCurrentUser } from './authActionThunk';
const authSlice = createSlice({
    name: 'authReducer',
    initialState: {
        currentUser: null,
        isLogin: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                const response = action.payload;
                if (!response || !response?.isSuccess) {
                    return {
                        ...state,
                        isLogin: false,
                    };
                }
                return {
                    ...state,
                    currentUser: response.data,
                    isLogin: true,
                };
            })
            .addCase(logout.fulfilled, (state, action) => {
                return {
                    ...state,
                    currentUser: null,
                    isLogin: false,
                };
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                const response = action.payload;
                if (!response || !response?.isSuccess) {
                    return {
                        ...state,
                        isLogin: false,
                    };
                }
                return {
                    ...state,
                    currentUser: response.data,
                    isLogin: true,
                };
            });
    },
});

export { login, logout, getCurrentUser };
export default authSlice.reducer;
