import { useState } from "react";
import API from "../api"; // Импортируем настроенный axios
import { useNavigate } from "react-router-dom";
import "./styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        iin: "",
        firstName: "",
        lastName: "",
        password: "",
        email: "",
        role: "USER",
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
            const response = await API.post("/api/account/registration", formData);
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
                <input type="text" name="iin" placeholder="ИИН" value={formData.iin} onChange={handleChange} required />
                <input type="text" name="firstName" placeholder="Имя" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Фамилия" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Пароль" value={formData.password} onChange={handleChange} required />
                <button type="submit">Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Register;
