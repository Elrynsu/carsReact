import { Navigate } from 'react-router'
import { useLogout } from '../../api/authApi';
import { useEffect } from 'react';

export default function Logout() {
    const { logout } = useLogout();

    useEffect(() => {
        logout();
    }, [logout]);

    return <Navigate to="/" replace />;
}
