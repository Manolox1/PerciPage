import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { useMenuData } from '../hooks/useMenuData';
import { Button } from '@/components/ui/button';
import useCart from '../contexts/UseCart';

const CategoryMenuPage = () => {
  const { categoryName } = useParams();
  const { formattedData: menuData, loading, error, refetch } = useMenuData();
  const { addToCart } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 flex justify-center items-center">
        <Loader2 className="w-12 h-12 animate-spin text-[rgb(22,148,137)]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 flex flex-col justify-center items-center text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar la categoría</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={refetch} className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white">
          Reintentar
        </Button>
      </div>
    );
  }

  const category = menuData.find((cat) => cat.id === categoryName);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-16 text-center px-4">
        <h1 className="text-3xl font-bold text-black mb-4">Categoría no encontrada</h1>
        <Link to="/menu" className="text-[rgb(22,148,137)] hover:underline inline-flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} - Perci Restaurant</title>
        <meta
          name="description"
          content={`Explora nuestra deliciosa selección de ${category.name.toLowerCase()} en Perci Restaurant.`}
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Header & Back Button */}
          <div className="mb-12">
            <Link 
              to="/menu" 
              className="inline-flex items-center text-gray-600 hover:text-[rgb(22,148,137)] transition-colors mb-6 font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Menú
            </Link>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-black border-b-2 border-[rgb(22,148,137)]/20 pb-4 inline-block"
            >
              {category.name}
            </motion.h1>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {category.items?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:scale-[1.02]"
              >
                {/* Image Section (Top 60-70%) */}
                <div className="relative w-full h-56 md:h-64 overflow-hidden shadow-sm">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Sin imagen</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                </div>

                {/* Information Section (Bottom 30-40%) */}
                <div className="p-5 flex flex-col flex-grow bg-white">
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h2 className="text-lg font-semibold text-black line-clamp-2 leading-tight">
                      {item.name}
                    </h2>
                    <span className="text-xl font-bold text-[rgb(22,148,137)] flex-shrink-0">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-sm text-[rgb(47,46,46)] line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <Button
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: Number(item.price.replace("$", "")),
                      })
                    }
                    className="mt-auto bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white"
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </motion.div>
            ))}
            {(!category.items || category.items.length === 0) && (
              <div className="col-span-full py-12 text-center text-gray-500">
                Aún no hay platos en esta categoría.
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default CategoryMenuPage;