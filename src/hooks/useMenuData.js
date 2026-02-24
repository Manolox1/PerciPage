import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useMenuData = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: cats, error: catError } = await supabase.from('categories').select('*').order('created_at', { ascending: true });
      if (catError) throw catError;

      const { data: items, error: dishError } = await supabase.from('dishes').select('*');
      if (dishError) throw dishError;

      setCategories(cats);
      setDishes(items);

      const formatted = cats.map(cat => ({
        id: cat.slug,
        categoryId: cat.id,
        name: cat.name,
        items: items.filter(d => d.category_id === cat.id).map(d => ({
          id: d.id,
          name: d.name,
          description: d.description,
          price: d.price,
          image: d.image
        }))
      }));
      setFormattedData(formatted);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { categories, dishes, formattedData, loading, error, refetch: fetchData };
};