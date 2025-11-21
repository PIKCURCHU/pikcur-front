import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { logout as performLogout } from "../common/utility";

interface AuthContextType {
    isAuth: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ isAuth: false, login: () => {}, logout: () => {} });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    const login = () => {
        setIsAuth(true);
    };

    const logout = () => {
        setIsAuth(false);
        performLogout();
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);