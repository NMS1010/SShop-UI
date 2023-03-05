import { createAsyncThunk } from '@reduxjs/toolkit';
import * as authAPI from '../../../services/authAPI';
import * as usersAPI from '../../../services/usersAPI';
import { getUserId, clearToken } from '../../../utils/authUtils';
export const login = createAsyncThunk('auth/login', async (data) => {
    let response = await authAPI.login(data.username, data.password);
    if (!response || !response?.isSuccess) {
        clearToken();
    } else {
        let { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        let userId = getUserId();
        response = await usersAPI.getUserById(userId);
        if (!response || !response?.isSuccess) {
            clearToken();
        }
    }
    return response;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    let userId = getUserId();
    const response = await authAPI.revokeToken(userId);
    clearToken();
    return response;
});
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
    let userId = getUserId();
    const response = await usersAPI.getUserById(userId);
    if (!response || !response?.isSuccess) {
        clearToken();
    }
    return response;
});
