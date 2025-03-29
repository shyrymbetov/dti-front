import axios from "axios";
import store from "./store";
import {logout} from "./slices/authSlice";

const API = axios.create({
    baseURL: "/sso",
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch(logout()); // Выходим из аккаунта
            window.location.href = "/login"; // Перенаправляем на страницу входа
        }
        return Promise.reject(error);
    }
);

export default API;
