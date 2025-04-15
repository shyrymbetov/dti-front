import { useState } from "react";
import API from "../api"; // Импортируем настроенный axios
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phoneNumber: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await API.post("/auth/register", formData);
            console.log("Успешная регистрация:", response.data);
            navigate("/login"); // Перенаправляем на страницу входа
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    return (
        <div className="register-container">
            <h1>Регистрация</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="surname"
                    placeholder="Фамилия"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Телефон"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Зарегистрироваться</button>
            </form>

        </div>
    );
};

export default Register;
