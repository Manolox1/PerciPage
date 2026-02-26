import { createContext, useState } from "react";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("adminAuth") === "true";
    });

    /*const login = (username, password) => {
        if (username === "admin" && password === "admin123") {
            setIsAuthenticated(true);
            localStorage.setItem("adminAuth", "true");
            return true;
        }
        return false;
    };*/

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("adminAuth");
    };

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};