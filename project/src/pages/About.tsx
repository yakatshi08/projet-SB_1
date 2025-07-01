import React from 'react';
import { Shield, Award, Users, Leaf } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Fiabilité',
      description: 'Plus de 10 ans d\'expérience dans le nettoyage professionnel'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Certifiés et formés aux dernières techniques de nettoyage'
    },
    {
      icon: Users,
      title: 'Service Client',
      description: 'Une équipe dédiée à votre satisfaction'
    },
    {
      icon: Leaf,
      title: 'Écologique',
      description: 'Produits respectueux de l\'environnement'
    }
  ];

  const team = [
    {
      name: 'Sophie Bernard',
      role: 'Fondatrice & Directrice',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Thomas Dubois',
      role: 'Responsable Opérations',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Marie Laurent',
      role: 'Chef d\'équipe',
      image: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            À Propos de SB Nettoyage
          </h1>
          <p className="text-center mt-2 text-green-100">
            Votre partenaire de confiance pour un environnement propre et sain
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
            <li className="text-deep-plum font-medium">À propos</li>
          </ol>
        </nav>

        {/* Histoire de l'entreprise */}
        <section className="mb-16">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-deep-plum mb-6">Notre Histoire</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-4">
                Fondée en 2014, SB Nettoyage est née de la passion de Sophie Bernard pour créer 
                des espaces de vie et de travail impeccables. Ce qui a commencé comme une petite 
                entreprise familiale est aujourd'hui devenu un leader régional du nettoyage professionnel.
              </p>
              <p className="mb-4">
                Notre engagement envers l'excellence et la satisfaction client nous a permis de 
                construire une réputation solide, basée sur la confiance et la qualité. Nous 
                servons fièrement plus de 500 clients réguliers, des particuliers aux grandes entreprises.
              </p>
              <p>
                Aujourd'hui, avec une équipe de plus de 20 professionnels qualifiés, nous 
                continuons à innover et à améliorer nos services pour répondre aux besoins 
                changeants de nos clients.
              </p>
            </div>
          </div>
        </section>

        {/* Nos valeurs */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <value.icon className="w-12 h-12 text-forest-green mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2 text-deep-plum">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notre équipe */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-deep-plum mb-8 text-center">Notre Équipe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-deep-plum">{member.name}</h3>
                  <p className="text-gray-600 mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chiffres clés */}
        <section className="bg-forest-green text-white rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">SB Nettoyage en Chiffres</h2>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-green-100">Années d'expérience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-green-100">Professionnels qualifiés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-green-100">Taux de satisfaction</div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-deep-plum mb-4">
            Prêt à Découvrir la Différence SB Nettoyage ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des centaines de clients satisfaits qui nous font confiance pour 
            maintenir leurs espaces propres et accueillants.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-forest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Réserver un Service
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

export default About;