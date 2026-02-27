import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AdminAuthContext } from "./AdminAuthContext";

export const AdminAuthProvider = ({ children }) => {
    const [adminUser, setAdminUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setAdminUser(data.session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setAdminUser(session?.user ?? null);
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
        return error;
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AdminAuthContext.Provider
            value={{ adminUser, loading, login, logout }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};