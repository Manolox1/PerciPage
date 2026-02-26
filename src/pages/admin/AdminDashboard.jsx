import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Layers, Utensils, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
    const { logout } = useAdminAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Restaurante Perci</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Cerrar Sesión
            </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
            <Link to="/admin/categories" className="block">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[rgb(22,148,137)]/10 rounded-full flex items-center justify-center group-hover:bg-[rgb(22,148,137)] transition-colors">
                    <Layers className="w-8 h-8 text-[rgb(22,148,137)] group-hover:text-white transition-colors" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Gestionar Categorías</h2>
                    <p className="text-gray-500">Añadir, editar o eliminar categorías del menú</p>
                </div>
                </div>
            </Link>

            <Link to="/admin/dishes" className="block">
                <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all border border-gray-100 flex items-center gap-6 group">
                <div className="w-16 h-16 bg-[rgb(22,148,137)]/10 rounded-full flex items-center justify-center group-hover:bg-[rgb(22,148,137)] transition-colors">
                    <Utensils className="w-8 h-8 text-[rgb(22,148,137)] group-hover:text-white transition-colors" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Gestionar Platos</h2>
                    <p className="text-gray-500">Añadir, editar o eliminar platos del menú</p>
                </div>
                </div>
            </Link>
            </div>
        </div>
        </div>
    );
};

export default AdminDashboard;