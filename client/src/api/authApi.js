import { useContext, useEffect } from "react";
import request from "../utils/request";
import { UserContext } from "../contexts/UserContext";


const baseUrl = 'http://localhost:3030/users';

export const useLogin = () => {

    const login = async (email, password) => {
        const result = await request.post(
            `${baseUrl}/login`,
            { email, password},
        );

        return result;
    }

    return {
        login,
    }
}

export const useRegister = () => {
    const register = (email, password) => 
        request.post(`${baseUrl}/register`, { email, password })

    return {
        register,
    }
}

export const useLogout = () => {
    const { accessToken, userLogoutHandler } = useContext(UserContext);

    const logout = async () => {
        if (!accessToken) return;

        await request.get(`${baseUrl}/logout`, null, {
            headers: { "X-Authorization": accessToken },
        });

        userLogoutHandler(); // Clears context + localStorage
    };

    return { logout };
};