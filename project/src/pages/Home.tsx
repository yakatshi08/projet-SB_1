import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle, Clock, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: CheckCircle,
      title: 'Service de Qualité',
      description: 'Professionnels formés et équipés'
    },
    {
      icon: Clock,
      title: 'Ponctualité Garantie',
      description: 'Toujours à l\'heure, sans exception'
    },
    {
      icon: Shield,
      title: 'Entièrement Assuré',
      description: 'Votre tranquillité d\'esprit garantie'
    },
    {
      icon: Sparkles,
      title: 'Produits Écologiques',
      description: 'Respectueux de l\'environnement'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section avec nouveau dégradé */}
      <section className="relative bg-gradient-to-br from-forest-green via-emerald-700 to-warm-gold text-white py-24 md:py-32 overflow-hidden">
        {/* Effet de superposition optionnel pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Des solutions adaptées à vos besoins pour des lieux toujours propres, sûrs et accueillants.
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 font-light">
            L'excellence du nettoyage professionnel
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-white text-forest-green px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-xl hover:shadow-2xl"
          >
            {t('home.cta')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Motif décoratif optionnel */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 text-warm-gray fill-current" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,48 L1440,48 L1440,0 Q1320,48 1200,24 T960,24 T720,24 T480,24 T240,24 T0,0 Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-warm-gray">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-deep-plum mb-12">
            Pourquoi Choisir SB Nettoyage ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
                <feature.icon className="w-12 h-12 text-forest-green mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-deep-plum">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;