import React from "react";  
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";
import { ArrowRight, Utensils, Award, Heart } from 'lucide-react';
import { Button } from "../components/ui/Button";

const HomePage = () =>{
    const features = [
        {
        icon: Utensils,
        title: 'Cocina Tradicional',
        description: 'Platos elaborados con recetas auténticas y los mejores ingredientes de temporada'
        },
        {
        icon: Award,
        title: 'Calidad Premium',
        description: 'Productos seleccionados cuidadosamente para garantizar la excelencia en cada plato'
        },
        {
        icon: Heart,
        title: 'Servicio Excepcional',
        description: 'Atención personalizada para que tu experiencia sea memorable'
        }
    ];

    return<>
        <Helmet>
            <title>Perci Restaurant - Experiencia Gastronómica Única</title>
            <meta
            name="description"
            content="Descubre Perci Restaurant, donde la tradición culinaria se encuentra con la excelencia. Disfruta de nuestra cocina mediterránea en un ambiente acogedor y elegante."
            />
        </Helmet>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1586812314139-d1b0ca32cbab"
                alt="Elegant Perci restaurant interior"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
                Bienvenido a Perci
            </motion.h1>
            
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-3xl mx-auto leading-relaxed font-light"
            >
                Donde cada plato cuenta una historia y cada momento se convierte en un recuerdo
            </motion.p>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-200"
            >
                Experiencia gastronómica única con ingredientes frescos de la más alta calidad en un ambiente elegante y acogedor
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
                <Link to="/menu">
                <Button className="bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-2">
                    Ver Menú
                    <ArrowRight className="w-5 h-5" />
                </Button>
                </Link>
                <Link to="/events">
                <Button
                    variant="outline"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg rounded-xl shadow-xl transition-all duration-300"
                >
                    Reservar Evento
                </Button>
                </Link>
            </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full mt-2"
                />
            </div>
            </motion.div>
        </section>

        {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              La Experiencia Perci
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nos apasiona crear momentos inolvidables a través de nuestra cocina
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[rgb(22,148,137)]/10 flex items-center justify-center group-hover:bg-[rgb(22,148,137)] transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-[rgb(22,148,137)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* Ambiance Section 1 */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Ambiente Sofisticado
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nuestro restaurante combina elegancia contemporánea con calidez mediterránea, creando el escenario perfecto para cualquier ocasión especial.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Cada rincón ha sido diseñado pensando en tu comodidad, con iluminación ambiental que realza la belleza de nuestros espacios y crea una atmósfera íntima y acogedora.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1684675144506-b181f5209c5a"
                alt="Sophisticated dining area at Perci restaurant"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          </div>
        </div>
        {/* Ambiance Section 2 */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-3xl overflow-hidden shadow-2xl order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1685338865875-9f6b90b8957b"
                alt="Warm and inviting atmosphere at Perci"
                className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Detalles que Marcan la Diferencia
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Desde la selección de vajilla hasta la disposición de las mesas, cada detalle está cuidadosamente pensado para ofrecerte una experiencia gastronómica excepcional.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestro equipo se dedica a hacer que cada visita sea memorable, combinando profesionalismo con un toque personal que te hará sentir como en casa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[rgb(22,148,137)] to-[rgb(18,118,109)] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para una Experiencia Única?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Descubre por qué Perci se ha convertido en el destino favorito para los amantes de la buena cocina
            </p>
            <Link to="/menu">
              <Button className="bg-white text-[rgb(22,148,137)] hover:bg-gray-100 px-10 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold">
                Explorar Nuestro Menú
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      </section>
    </>
}

export default HomePage