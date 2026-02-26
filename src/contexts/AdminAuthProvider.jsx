import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { AdminAuthContext } from "./AdminAuthContext";

export const AdminAuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar sesión activa al cargar
        supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
            setIsAuthenticated(true);
            setUser(data.session.user);
        }
        });

        // Escuchar cambios de sesión
        const { data: listener } = supabase.auth.onAuthStateChange(
        (_event, session) => {
            setIsAuthenticated(!!session);
            setUser(session?.user ?? null);
        }
        );

        return () => {
        listener.subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
        return { success: false, error: error.message };
        }

        return { success: true };
    };

    const logout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AdminAuthContext.Provider
        value={{ isAuthenticated, login, logout, user }}
        >
        {children}
        </AdminAuthContext.Provider>
    );
};