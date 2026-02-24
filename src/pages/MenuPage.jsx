import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useMenuData } from '@/hooks/useMenuData';
import { Button } from '@/components/ui/button';

const MenuPage = () => {
  const { formattedData: menuData, loading, error, refetch } = useMenuData();

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al cargar el menú</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Button onClick={refetch} className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white">
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Menú - Perci Restaurant</title>
        <meta
          name="description"
          content="Explora nuestras categorías de menú: entradas, platos principales, postres y bebidas. Cocina mediterránea de calidad en Perci Restaurant."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Nuestro Menú
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Selecciona una categoría para descubrir nuestra selección de platos elaborados con ingredientes frescos
            </motion.p>
          </div>

          {/* Menu Categories Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuData.map((category, index) => (
              <Link key={category.id} to={`/menu/${category.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden flex items-center justify-between"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgb(22,148,137)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-[rgb(22,148,137)] transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-gray-500">
                      Ver los {category.items?.length || 0} platos disponibles
                    </p>
                  </div>

                  <div className="relative z-10 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[rgb(22,148,137)] transition-colors duration-300 shadow-sm">
                    <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default MenuPage;