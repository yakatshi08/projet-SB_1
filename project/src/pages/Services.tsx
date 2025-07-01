import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { Home, Building, Sparkles, Hammer } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: Home,
      title: 'Nettoyage à domicile',
      description: 'Service complet de nettoyage pour votre maison. Nous nous occupons de toutes les pièces avec attention aux détails.',
      price: '25€/h',
      features: [
        'Nettoyage de toutes les pièces',
        'Produits écologiques inclus',
        'Équipe formée et assurée',
        'Flexibilité horaire'
      ]
    },
    {
      icon: Building,
      title: 'Nettoyage de bureaux',
      description: 'Maintenez un environnement professionnel impeccable pour vos employés et clients.',
      price: '30€/h',
      features: [
        'Nettoyage quotidien ou hebdomadaire',
        'Désinfection des espaces de travail',
        'Vidage des corbeilles',
        'Entretien des sanitaires'
      ]
    },
    {
      icon: Sparkles,
      title: 'Grand nettoyage',
      description: 'Nettoyage en profondeur pour un résultat exceptionnel. Idéal pour les changements de saison.',
      price: '120€',
      features: [
        'Nettoyage approfondi',
        'Dégraissage cuisine',
        'Nettoyage vitres intérieures',
        'Aspiration matelas et canapés'
      ]
    },
    {
      icon: Hammer,
      title: 'Nettoyage après travaux',
      description: 'Remise en état après rénovation ou construction. Élimination de la poussière et des résidus.',
      price: '150€',
      features: [
        'Élimination poussière de chantier',
        'Nettoyage résidus de peinture',
        'Dégraissage surfaces',
        'Remise en état complète'
      ]
    }
  ];

  const handleBookService = () => {
    navigate('/booking');
  };

  return (
    <div className="bg-warm-gray min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-forest-green mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services de nettoyage professionnel. 
            Chaque prestation est adaptée à vos besoins spécifiques.
          </p>
        </div>

        {/* Grille des services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              onBook={handleBookService}
            />
          ))}
        </div>

        {/* Section avantages */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-forest-green text-center mb-8">
            Pourquoi choisir SB-Nettoyage ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-golden-orange" />
              </div>
              <h3 className="text-xl font-semibold text-forest-green mb-2">Qualité garantie</h3>
              <p className="text-gray-600">Satisfaction client garantie ou intervention gratuite</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-golden-orange" />
              </div>
              <h3 className="text-xl font-semibold text-forest-green mb-2">Équipe professionnelle</h3>
              <p className="text-gray-600">Personnel formé, expérimenté et entièrement assuré</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-golden-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-golden-orange" />
              </div>
              <h3 className="text-xl font-semibold text-forest-green mb-2">Produits écologiques</h3>
              <p className="text-gray-600">Respect de l'environnement et de votre santé</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="bg-forest-green rounded-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Besoin d'un devis personnalisé ?</h2>
            <p className="text-xl mb-6 text-gray-100">
              Contactez-nous pour une évaluation gratuite et sans engagement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookService}
                className="bg-golden-orange text-white font-semibold px-8 py-3 rounded-lg hover:bg-golden-orange/90 transition-colors duration-200"
              >
                Réserver maintenant
              </button>
              <a
                href="tel:+33123456789"
                className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-forest-green transition-colors duration-200"
              >
                Appeler pour un devis
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;