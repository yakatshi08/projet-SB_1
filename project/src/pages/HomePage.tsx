import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-gray">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-forest-green mb-8">
          Bienvenue chez SB Nettoyage
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Services professionnels de nettoyage pour bureaux, commerces et industries.
        </p>
        <Link
          to="/reservation"
          className="inline-block bg-golden-orange hover:bg-golden-orange/90 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Réserver maintenant
        </Link>
      </div>
    </div>
  );
};

export default HomePage;