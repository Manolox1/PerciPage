import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from "../../hooks/useAdminAuth";
import { useToast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAdminAuth();
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast({
                title: 'Error',
                description: 'Por favor, ingrese email y contraseña.',
                variant: 'destructive',
            });
            return;
        }

        const result = await login(email, password);

        if (result.success) {
            toast({
                title: 'Éxito',
                description: 'Inicio de sesión exitoso.',
            });
            navigate('/admin/dashboard');
        } else {
            toast({
                title: 'Error',
                description: result.error || 'Credenciales inválidas.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-[rgb(22,148,137)]/10 rounded-full flex items-center justify-center">
                        <Lock className="h-6 w-6 text-[rgb(22,148,137)]" />
                    </div>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Perci Restaurant</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[rgb(22,148,137)] focus:border-[rgb(22,148,137)] text-gray-900"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[rgb(22,148,137)] focus:border-[rgb(22,148,137)] text-gray-900"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white py-2 px-4 rounded-md"
                    >
                        Iniciar Sesión
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;