import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Building, Sparkles, Package, Brush, Shield } from 'lucide-react';

const Services: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Home,
      title: 'Nettoyage Résidentiel',
      description: 'Service complet pour votre maison ou appartement',
      features: ['Nettoyage hebdomadaire', 'Produits écologiques', 'Personnel de confiance']
    },
    {
      icon: Building,
      title: 'Nettoyage Commercial',
      description: 'Solutions professionnelles pour vos locaux',
      features: ['Bureaux et commerces', 'Contrats flexibles', 'Intervention rapide']
    },
    {
      icon: Sparkles,
      title: 'Nettoyage en Profondeur',
      description: 'Pour un résultat impeccable',
      features: ['Après déménagement', 'Grand ménage saisonnier', 'Remise en état']
    },
    {
      icon: Package,
      title: 'Services Spécialisés',
      description: 'Réponse à vos besoins spécifiques',
      features: ['Vitres et façades', 'Tapis et moquettes', 'Après travaux']
    }
  ];

  return (
    <div className="min-h-screen bg-warm-gray">
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            {t('services.title')}
          </h1>
          <p className="text-center mt-2 text-green-100">
            Des solutions adaptées à tous vos besoins
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center mb-4">
                <service.icon className="w-12 h-12 text-forest-green mr-4" />
                <h2 className="text-2xl font-bold text-deep-plum">{service.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;