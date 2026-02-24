import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menú', path: '/menu' },
    { name: 'TakeAway', path: '/takeaway' },
    { name: 'Eventos', path: '/events' }
  ];

  return (
    <footer className="bg-[rgb(47,46,46)] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-white">Perci</h3>
            <p className="text-gray-300 leading-relaxed">
              Experiencia gastronómica única con los mejores ingredientes y un ambiente acogedor.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[rgb(22,148,137)] transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[rgb(22,148,137)] flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  Calle Ejemplo 123<br />28001 Madrid, España
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[rgb(22,148,137)] flex-shrink-0" />
                <a
                  href="tel:+34912345678"
                  className="text-gray-300 hover:text-[rgb(22,148,137)] transition-colors"
                >
                  +34 912 345 678
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[rgb(22,148,137)] flex-shrink-0" />
                <a
                  href="mailto:info@perci.com"
                  className="text-gray-300 hover:text-[rgb(22,148,137)] transition-colors"
                >
                  info@perci.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Horario</h4>
            <div className="text-gray-300 space-y-1">
              <p>Lunes - Viernes: 13:00 - 23:30</p>
              <p>Sábados: 13:00 - 00:00</p>
              <p>Domingos: 13:00 - 22:00</p>
            </div>
            <div className="pt-4">
              <p className="text-sm font-medium text-white mb-3">Síguenos</p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[rgb(22,148,137)] transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Perci Restaurant. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;