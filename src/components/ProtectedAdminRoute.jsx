import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminAuthContext } from "../contexts/AdminAuthContext";

export default function ProtectedAdminRoute({ children }) {
    const { adminUser, loading } = useContext(AdminAuthContext);

    if (loading) return <p>Cargando...</p>;

    if (!adminUser) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
    }