import { useEffect, useState } from "react";
import API from "../api";
import "./styles/Profile.css"; // Подключаем стили

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await API.get("/auth/me");
                setUser(data);
            } catch (error) {
                console.error("Ошибка загрузки профиля:", error.response?.data?.message);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="profile-container">
            <h1>Профиль</h1>
            <p><span className="label">ФИО:</span> <span className="value">{user.fullName}</span></p>
            <p><span className="label">Email:</span> <span className="value">{user.email}</span></p>
            <p><span className="label">Дата создания:</span> <span className="value">{new Date(user.created).toLocaleString()}</span></p>
        </div>
    );
};

export default Profile;
