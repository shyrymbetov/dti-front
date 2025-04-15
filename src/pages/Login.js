import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import API from "../api";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css"; // Подключаем стили

const Login = () => {
    const [email, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", { email, password });
            dispatch(login(data.token));
            navigate("/");
        } catch (error) {
            console.error("Ошибка авторизации:", error.response?.data?.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" value={email} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default Login;
