import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Shield, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Shield,
      title: t('home.features.quality'),
      description: 'Équipe formée et matériel professionnel'
    },
    {
      icon: Users,
      title: t('home.features.professional'),
      description: 'Personnel qualifié et expérimenté'
    },
    {
      icon: Clock,
      title: t('home.features.flexible'),
      description: 'Interventions selon votre planning'
    }
  ];

  return (
    <div className="bg-warm-gray">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest-green to-forest-green/80 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center space-x-2 bg-golden-orange text-white font-semibold px-8 py-4 rounded-lg hover:bg-golden-orange/90 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span>{t('home.cta')}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir un service de qualité supérieure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-golden-orange/10 rounded-lg mb-6 mx-auto">
                    <Icon className="h-8 w-8 text-golden-orange" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest-green mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-forest-green mb-4">
              Nos services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Des solutions adaptées à tous vos besoins de nettoyage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Nettoyage à domicile',
                description: 'Service complet pour votre maison',
                price: 'À partir de 25€/h'
              },
              {
                title: 'Nettoyage de bureaux',
                description: 'Environnement professionnel impeccable',
                price: 'À partir de 30€/h'
              },
              {
                title: 'Grand nettoyage',
                description: 'Nettoyage en profondeur',
                price: 'À partir de 120€'
              }
            ].map((service, index) => (
              <div
                key={index}
                className="bg-warm-gray rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-forest-green mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-golden-orange font-semibold mb-4">{service.price}</p>
                <Link
                  to="/services"
                  className="inline-flex items-center space-x-1 text-forest-green hover:text-golden-orange transition-colors duration-200"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center space-x-2 bg-forest-green text-white font-semibold px-8 py-3 rounded-lg hover:bg-forest-green/90 transition-colors duration-200"
            >
              <span>Voir tous nos services</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-golden-orange">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à réserver votre service ?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contactez-nous dès maintenant pour un devis gratuit et personnalisé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-golden-orange font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Réserver maintenant
            </Link>
            <a
              href="tel:+33123456789"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-golden-orange transition-colors duration-200"
            >
              Appeler maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;