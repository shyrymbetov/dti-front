import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
    const { isAuth } = useSelector((state) => state.auth);

    return isAuth ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
