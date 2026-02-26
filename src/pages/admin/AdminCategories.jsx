import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: '', name: '', slug: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const { toast } = useToast();

    const fetchCategories = async () => {
        setIsFetching(true);
        const { data, error } = await supabase.from('categories').select('*').order('created_at', { ascending: false });
        if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } else {
        setCategories(data);
        }
        setIsFetching(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const slug = currentCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        
        try {
        if (currentCategory.id) {
            const { error } = await supabase.from('categories').update({ name: currentCategory.name, slug }).eq('id', currentCategory.id);
            if (error) throw error;
            toast({ title: 'Categoría actualizada' });
        } else {
            const { error } = await supabase.from('categories').insert([{ name: currentCategory.name, slug }]);
            if (error) throw error;
            toast({ title: 'Categoría creada' });
        }
        setIsModalOpen(false);
        fetchCategories();
        } catch (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
        setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta categoría? Se eliminarán también los platos asociados.')) {
        setIsLoading(true);
        try {
            const { error } = await supabase.from('categories').delete().eq('id', id);
            if (error) throw error;
            toast({ title: 'Categoría eliminada' });
            fetchCategories();
        } catch (error) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
        }
    };

    const openModal = (category = { id: '', name: '', slug: '' }) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-6 flex justify-between items-center">
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-[rgb(22,148,137)] flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
            </Link>
            <Button onClick={() => openModal()} disabled={isLoading || isFetching} className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white">
                <Plus className="w-4 h-4 mr-2" /> Agregar Categoría
            </Button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden">
            {isFetching ? (
                <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[rgb(22,148,137)]" /></div>
            ) : (
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                    <th className="p-4 font-semibold text-gray-700">Nombre</th>
                    <th className="p-4 font-semibold text-gray-700">Slug</th>
                    <th className="p-4 font-semibold text-gray-700 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                    <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-900">{cat.name}</td>
                        <td className="p-4 text-gray-600">{cat.slug}</td>
                        <td className="p-4 text-right space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openModal(cat)} disabled={isLoading}>
                            <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)} disabled={isLoading}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                        </td>
                    </tr>
                    ))}
                    {categories.length === 0 && (
                    <tr>
                        <td colSpan="3" className="p-4 text-center text-gray-500">No hay categorías</td>
                    </tr>
                    )}
                </tbody>
                </table>
            )}
            </div>

            {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{currentCategory.id ? 'Editar' : 'Nueva'} Categoría</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        required
                        disabled={isLoading}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                        value={currentCategory.name}
                        onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                    />
                    </div>
                    <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={isLoading}>Cancelar</Button>
                    <Button type="submit" className="bg-[rgb(22,148,137)] text-white" disabled={isLoading}>
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                        Guardar
                    </Button>
                    </div>
                </form>
                </div>
            </div>
            )}
        </div>
        </div>
    );
};

export default AdminCategories;