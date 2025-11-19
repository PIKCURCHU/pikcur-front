import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
    isAuth: boolean;
}

const AuthContext = createContext<AuthContextType>({ isAuth: false });

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);