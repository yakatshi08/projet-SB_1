import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';

const Pricing: React.FC = () => {
  const [billingType, setBillingType] = useState<'monthly' | 'yearly'>('monthly');

  const pricingPlans = [
    {
      name: 'Essentiel',
      description: 'Parfait pour les petits espaces',
      monthlyPrice: 49,
      yearlyPrice: 490,
      features: [
        { text: 'Nettoyage hebdomadaire', included: true },
        { text: 'Jusqu\'à 50m²', included: true },
        { text: 'Produits écologiques', included: true },
        { text: 'Garantie satisfaction', included: true },
        { text: 'Service weekend', included: false },
        { text: 'Nettoyage vitres', included: false },
        { text: 'Support prioritaire', included: false }
      ],
      recommended: false
    },
    {
      name: 'Professionnel',
      description: 'Le choix le plus populaire',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        { text: 'Nettoyage bi-hebdomadaire', included: true },
        { text: 'Jusqu\'à 150m²', included: true },
        { text: 'Produits écologiques', included: true },
        { text: 'Garantie satisfaction', included: true },
        { text: 'Service weekend', included: true },
        { text: 'Nettoyage vitres inclus', included: true },
        { text: 'Support prioritaire', included: false }
      ],
      recommended: true
    },
    {
      name: 'Entreprise',
      description: 'Pour les grands espaces',
      monthlyPrice: 199,
      yearlyPrice: 1990,
      features: [
        { text: 'Nettoyage quotidien', included: true },
        { text: 'Surface illimitée', included: true },
        { text: 'Produits écologiques', included: true },
        { text: 'Garantie satisfaction', included: true },
        { text: 'Service weekend', included: true },
        { text: 'Nettoyage vitres inclus', included: true },
        { text: 'Support prioritaire 24/7', included: true }
      ],
      recommended: false
    }
  ];

  const additionalServices = [
    { name: 'Nettoyage après travaux', price: 'À partir de 150€' },
    { name: 'Désinfection COVID-19', price: 'À partir de 80€' },
    { name: 'Nettoyage de tapis', price: '25€/m²' },
    { name: 'Lavage haute pression', price: 'À partir de 120€' },
    { name: 'Débarras et encombrants', price: 'Sur devis' },
    { name: 'Nettoyage de fin de bail', price: 'À partir de 200€' }
  ];

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Nos Tarifs
          </h1>
          <p className="text-center mt-2 text-green-100">
            Des prix transparents pour tous vos besoins de nettoyage
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <a href="/" className="text-gray-600 hover:text-forest-green">Accueil</a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-deep-plum font-medium">Tarifs</li>
          </ol>
        </nav>

        {/* Toggle mensuel/annuel */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setBillingType('monthly')}
              className={`px-6 py-2 rounded-full transition ${
                billingType === 'monthly'
                  ? 'bg-forest-green text-white'
                  : 'text-gray-600'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingType('yearly')}
              className={`px-6 py-2 rounded-full transition ${
                billingType === 'yearly'
                  ? 'bg-forest-green text-white'
                  : 'text-gray-600'
              }`}
            >
              Annuel (-15%)
            </button>
          </div>
        </div>

        {/* Plans tarifaires */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden ${
                plan.recommended ? 'ring-2 ring-forest-green' : ''
              }`}
            >
              {plan.recommended && (
                <div className="bg-forest-green text-white text-center py-2 text-sm font-semibold">
                  RECOMMANDÉ
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-deep-plum mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-forest-green">
                    {billingType === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}€
                  </span>
                  <span className="text-gray-600 ml-2">
                    /{billingType === 'monthly' ? 'mois' : 'an'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                
                  href="/booking"
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                    plan.recommended
                      ? 'bg-forest-green text-white hover:bg-green-700'
                      : 'bg-gray-100 text-deep-plum hover:bg-gray-200'
                  }`}
                >
                  Choisir ce plan
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Services additionnels */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8 text-center">
            Services Additionnels
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{service.name}</span>
                  <span className="font-semibold text-forest-green">{service.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Tarifs */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-deep-plum mb-6">Questions Fréquentes sur les Tarifs</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-deep-plum mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-forest-green" />
                Les prix incluent-ils les produits de nettoyage ?
              </h3>
              <p className="text-gray-600">
                Oui, tous nos tarifs incluent les produits de nettoyage écologiques et le matériel nécessaire.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-deep-plum mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-forest-green" />
                Y a-t-il des frais cachés ?
              </h3>
              <p className="text-gray-600">
                Non, nos tarifs sont transparents. Le prix affiché est le prix final, sans surprise.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-deep-plum mb-2 flex items-center gap-2">
                <Info className="w-5 h-5 text-forest-green" />
                Puis-je changer de formule ?
              </h3>
              <p className="text-gray-600">
                Oui, vous pouvez modifier votre formule à tout moment avec un préavis de 30 jours.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center mt-12">
          <h2 className="text-2xl font-bold text-deep-plum mb-4">
            Besoin d'un Devis Personnalisé ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Pour des besoins spécifiques ou des surfaces importantes, contactez-nous pour un devis sur mesure.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-forest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Demander un Devis
            </a>
            <a 
              href="/contact" 
              className="bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Nous Contacter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pricing;