import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import messageReducer from './features/message/messageSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export default store;
