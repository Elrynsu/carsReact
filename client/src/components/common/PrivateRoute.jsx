import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";


export default function PrivateRoute() {
    const { accessToken } = useAuth();

    return accessToken
        ? <Outlet />
        : <Navigate to="/auth/login" replace />;

}