import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Users, Calendar, Heart, Briefcase, PartyPopper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Events = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        eventType: '',
        date: '',
        guestCount: ''
    });

    const eventTypes = [
        {
        icon: Heart,
        title: 'Bodas y Celebraciones',
        description: 'Haz de tu día especial un momento inolvidable con nuestro servicio personalizado'
        },
        {
        icon: Briefcase,
        title: 'Eventos Corporativos',
        description: 'Espacio ideal para reuniones de negocios, presentaciones y eventos empresariales'
        },
        {
        icon: PartyPopper,
        title: 'Fiestas Privadas',
        description: 'Celebra cumpleaños, aniversarios o cualquier ocasión especial en un ambiente único'
        },
        {
        icon: Users,
        title: 'Grupos y Reuniones',
        description: 'Espacios adaptables para grupos de cualquier tamaño con menús personalizados'
        }
    ];

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name || !formData.email || !formData.eventType || !formData.date || !formData.guestCount) {
        toast({
            title: 'Campos incompletos',
            description: 'Por favor, completa todos los campos del formulario.',
            variant: 'destructive'
        });
        return;
        }

        // Show success message (since backend is not implemented)
        toast({
        title: '¡Solicitud Enviada!',
        description: 'Nos pondremos en contacto contigo pronto para confirmar los detalles de tu evento.',
        duration: 5000
        });

        // Reset form
        setFormData({
        name: '',
        email: '',
        eventType: '',
        date: '',
        guestCount: ''
        });
    };

    return (
        <>
        <Helmet>
            <title>Eventos - Perci Restaurant</title>
            <meta
            name="description"
            content="Organiza tu evento especial en Perci Restaurant. Bodas, celebraciones corporativas, fiestas privadas y reuniones con servicio personalizado."
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
                Eventos Especiales
                </motion.h1>
                <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                >
                Crea momentos inolvidables en un espacio único con servicio personalizado y cocina excepcional
                </motion.p>
            </div>

            {/* Featured Image */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-5xl mx-auto mb-16 rounded-3xl overflow-hidden shadow-2xl"
            >
                <img
                src="https://images.unsplash.com/photo-1691434885126-b539cdfa04f5"
                alt="Elegant event space at Perci restaurant"
                className="w-full h-[500px] object-cover"
                />
            </motion.div>

            {/* Event Types */}
            <div className="max-w-6xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Tipos de Eventos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {eventTypes.map((event, index) => (
                    <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                    <div className="w-16 h-16 rounded-full bg-[rgb(22,148,137)]/10 flex items-center justify-center mb-6">
                        <event.icon className="w-8 h-8 text-[rgb(22,148,137)]" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {event.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                        {event.description}
                    </p>
                    </motion.div>
                ))}
                </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
                >
                <div className="text-center mb-8">
                    <Calendar className="w-16 h-16 text-[rgb(22,148,137)] mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Solicita Información
                    </h2>
                    <p className="text-gray-600">
                    Completa el formulario y nos pondremos en contacto contigo para planificar tu evento
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre Completo *
                        </label>
                        <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(22,148,137)] focus:border-transparent transition-all"
                        placeholder="Tu nombre"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                        </label>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(22,148,137)] focus:border-transparent transition-all"
                        placeholder="tu@email.com"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Evento *
                    </label>
                    <select
                        id="eventType"
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(22,148,137)] focus:border-transparent transition-all"
                    >
                        <option value="">Selecciona un tipo</option>
                        <option value="wedding">Boda</option>
                        <option value="corporate">Evento Corporativo</option>
                        <option value="birthday">Cumpleaños</option>
                        <option value="anniversary">Aniversario</option>
                        <option value="other">Otro</option>
                    </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha Deseada *
                        </label>
                        <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(22,148,137)] focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Invitados *
                        </label>
                        <input
                        type="number"
                        id="guestCount"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(22,148,137)] focus:border-transparent transition-all"
                        placeholder="Ej: 50"
                        />
                    </div>
                    </div>

                    <Button
                    type="submit"
                    className="w-full bg-[rgb(22,148,137)] hover:bg-[rgb(18,118,109)] text-white font-semibold py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                    Enviar Solicitud
                    </Button>
                </form>

                <p className="text-sm text-gray-500 text-center mt-6">
                    * Campos obligatorios
                </p>
                </motion.div>
            </div>
            </div>
        </div>
        </>
    );
};

export default Events;