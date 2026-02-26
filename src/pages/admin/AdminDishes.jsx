import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { uploadDishImage } from "@/lib/storageClient";

const AdminDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDish, setCurrentDish] = useState({ id: '', name: '', description: '', price: '', category_id: '', image: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const [dishesRes, categoriesRes] = await Promise.all([
        supabase.from('dishes').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name', { ascending: true })
      ]);
      
      if (dishesRes.error) throw dishesRes.error;
      if (categoriesRes.error) throw categoriesRes.error;

      setDishes(dishesRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentDish.category_id) {
      toast({ title: 'Error', description: 'Seleccione una categoría', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    const payload = {
      name: currentDish.name,
      description: currentDish.description,
      price: currentDish.price,
      category_id: currentDish.category_id,
      image: currentDish.image
    };

    try {
      if (currentDish.id) {
        const { error } = await supabase.from('dishes').update(payload).eq('id', currentDish.id);
        if (error) throw error;
        toast({ title: 'Plato actualizado' });
      } else {
        const { error } = await supabase.from('dishes').insert([payload]);
        if (error) throw error;
        toast({ title: 'Plato creado' });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este plato?')) {
      setIsLoading(true);
      try {
        const { error } = await supabase.from('dishes').delete().eq('id', id);
        if (error) throw error;
        toast({ title: 'Plato eliminado' });
        fetchData();
      } catch (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const openModal = (dish = { id: '', name: '', description: '', price: '', category_id: categories[0]?.id || '', image: '' }) => {
    setCurrentDish(dish);
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const imageUrl = await uploadDishImage(file);

    setCurrentDish({
      ...currentDish,
      image: imageUrl,
    });

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/admin/dashboard" className="text-gray-600 hover:text-[rgb(22,148,137)] flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Dashboard
          </Link>
          <Button onClick={() => openModal()} disabled={isLoading || isFetching || categories.length === 0} className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white">
            <Plus className="w-4 h-4 mr-2" /> Agregar Plato
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden overflow-x-auto">
          {isFetching ? (
            <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[rgb(22,148,137)]" /></div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-700 w-20">Imagen</th>
                  <th className="p-4 font-semibold text-gray-700">Nombre</th>
                  <th className="p-4 font-semibold text-gray-700">Categoría</th>
                  <th className="p-4 font-semibold text-gray-700">Precio</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      {dish.image && <img src={dish.image} alt={dish.name} className="w-12 h-12 object-cover rounded-md" />}
                    </td>
                    <td className="p-4 font-medium text-gray-900">{dish.name}</td>
                    <td className="p-4 text-gray-600">{categories.find(c => c.id === dish.category_id)?.name}</td>
                    <td className="p-4 text-[rgb(22,148,137)] font-bold">{dish.price}</td>
                    <td className="p-4 text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openModal(dish)} disabled={isLoading}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(dish.id)} disabled={isLoading}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {dishes.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">No hay platos</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{currentDish.id ? 'Editar' : 'Nuevo'} Plato</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    value={currentDish.name}
                    onChange={(e) => setCurrentDish({ ...currentDish, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    required
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    value={currentDish.category_id}
                    onChange={(e) => setCurrentDish({ ...currentDish, category_id: e.target.value })}
                  >
                    <option value="">Seleccione...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Precio</label>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    value={currentDish.price}
                    onChange={(e) => setCurrentDish({ ...currentDish, price: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción</label>
                  <textarea
                    required
                    disabled={isLoading}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                    value={currentDish.description}
                    onChange={(e) => setCurrentDish({ ...currentDish, description: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Imagen del plato
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isLoading}
                    className="mt-1 block w-full text-gray-900"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </div>
                {currentDish.image && (
                  <div className="mt-2">
                    <img src={currentDish.image} alt="Preview" className="w-full h-32 object-cover rounded-md" />
                  </div>
                )}
                <div className="flex justify-end space-x-2 pt-4">
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

export default AdminDishes;