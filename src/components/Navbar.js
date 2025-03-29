import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import "./styles/Navbar.css"; // Подключаем стили

const Navbar = () => {
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="logo">Главная</Link>
                <div className="nav-links">
                    {!isAuth ? (
                        <>
                            <Link to="/login" className="nav-item">Вход</Link>
                            <Link to="/register" className="nav-item">Регистрация</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" className="nav-item">Профиль</Link>
                            <Link to="/create" className="nav-item">Добавить товар</Link>
                            <Link to="/my" className="nav-item">Мои товары</Link>
                            <button onClick={handleLogout} className="logout-btn">Выйти</button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
