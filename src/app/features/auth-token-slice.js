// authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    authToken: null,
    isAuthenticated: false,
};

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        login: (state, action) => {
            const { authToken } = action.payload;
            state.authToken = authToken;
            state.isAuthenticated = true;
            // Set cookie with expiration time
            Cookies.set('authToken', authToken, { expires: 25 / (24 * 60) }); // Expires in 25 minutes
        },
        logout: (state) => {
            state.authToken = null;
            state.isAuthenticated = false;
            // Remove token from cookie
            Cookies.remove('authToken');
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
    },
});

export const { login, logout, setAuthToken } = authenticationSlice.actions;

export default authenticationSlice;
