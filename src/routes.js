import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute.js";
import MyProducts from "./pages/MyProducts";

const AppRoutes = () => {
    return (
        <Router>
            <Navbar />
            <div style={{ marginLeft: "220px", padding: "20px" }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product/:id" element={<ProductPage />} />

                    {/* Защищённые маршруты */}
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
                    <Route path="/create" element={<ProtectedRoute element={<CreateProduct />} />} />
                    <Route path="/my" element={<ProtectedRoute element={<MyProducts />} />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
};

export default AppRoutes;
