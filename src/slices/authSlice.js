import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const initialState = {
    token: token || null,
    user: user || null,
    isAuth: !!token,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.user = jwtDecode(action.payload);
            state.isAuth = true;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuth = false;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
