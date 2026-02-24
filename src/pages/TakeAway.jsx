import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Phone, Clock, ShoppingBag, CheckCircle, Mail } from 'lucide-react';

const TakeAway = () => {
    const steps = [
        {
        icon: Phone,
        title: 'Realiza tu Pedido',
        description: 'Llámanos al +34 912 345 678 o envíanos un email con tu pedido'
        },
        {
        icon: Clock,
        title: 'Tiempo de Preparación',
        description: 'Preparamos tu pedido con los mismos estándares de calidad (20-30 min aprox.)'
        },
        {
        icon: ShoppingBag,
        title: 'Recogida',
        description: 'Recoge tu pedido en nuestro restaurante en el horario acordado'
        },
        {
        icon: CheckCircle,
        title: 'Disfruta en Casa',
        description: 'Disfruta de nuestra cocina en la comodidad de tu hogar'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
        <Helmet>
            <title>TakeAway - Perci Restaurant</title>
            <meta
            name="description"
            content="Disfruta de nuestra exquisita cocina en casa. Servicio de comida para llevar en Perci Restaurant. Llama y recoge tu pedido."
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
                TakeAway
                </motion.h1>
                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                Lleva la experiencia Perci a tu hogar. La misma calidad, en la comodidad de tu casa.
                </motion.p>
            </div>

            {/* Featured Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-2xl"
            >
                <img
                src="https://images.unsplash.com/photo-1598147531769-43fb0a64c02e"
                alt="Gourmet packaged meal from Perci restaurant"
                className="w-full h-[400px] object-cover"
                />
            </motion.div>

            {/* Process Steps */}
            <div className="max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Proceso de Pedido
                </h2>
                <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                {steps.map((step, index) => (
                    <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                    <div className="absolute -top-4 left-8">
                        <div className="w-12 h-12 rounded-full bg-[rgb(22,148,137)] flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{index + 1}</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="w-14 h-14 rounded-full bg-[rgb(22,148,137)]/10 flex items-center justify-center mb-4">
                        <step.icon className="w-7 h-7 text-[rgb(22,148,137)]" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                        {step.description}
                        </p>
                    </div>
                    </motion.div>
                ))}
                </motion.div>
            </div>

            {/* Contact & Hours Info */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Card */}
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
                >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Información de Contacto
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(22,148,137)]/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-[rgb(22,148,137)]" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Teléfono</p>
                        <a
                        href="tel:+34912345678"
                        className="text-lg font-semibold text-gray-900 hover:text-[rgb(22,148,137)] transition-colors"
                        >
                        +34 912 345 678
                        </a>
                    </div>
                    </div>
                    <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-[rgb(22,148,137)]/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-[rgb(22,148,137)]" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <a
                        href="mailto:takeaway@perci.com"
                        className="text-lg font-semibold text-gray-900 hover:text-[rgb(22,148,137)] transition-colors"
                        >
                        takeaway@perci.com
                        </a>
                    </div>
                    </div>
                </div>
                </motion.div>

                {/* Hours Card */}
                <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
                >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Horario TakeAway
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Lunes - Viernes</span>
                    <span className="text-gray-900 font-semibold">13:00 - 23:00</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Sábados</span>
                    <span className="text-gray-900 font-semibold">13:00 - 23:30</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-700">Domingos</span>
                    <span className="text-gray-900 font-semibold">13:00 - 21:30</span>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-[rgb(22,148,137)]/10 rounded-xl">
                    <p className="text-sm text-gray-700 leading-relaxed">
                    <strong>Nota:</strong> Se recomienda realizar pedidos con al menos 30 minutos de antelación para garantizar la mejor calidad.
                    </p>
                </div>
                </motion.div>
            </div>
            </div>
        </div>
        </>
    );
};

export default TakeAway;