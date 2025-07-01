import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company?: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  image: string;
}

const Testimonials: React.FC = () => {
  const [selectedService, setSelectedService] = useState('all');

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie Dupont',
      role: 'Particulier',
      rating: 5,
      comment: 'Service impeccable ! L\'équipe est ponctuelle, professionnelle et très minutieuse. Mon appartement n\'a jamais été aussi propre. Je recommande vivement SB Nettoyage.',
      date: 'Il y a 2 semaines',
      serviceType: 'Nettoyage régulier',
      image: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Jean-Pierre Martin',
      role: 'Directeur',
      company: 'Tech Solutions',
      rating: 5,
      comment: 'Nous faisons appel à SB Nettoyage pour nos bureaux depuis 2 ans. Service irréprochable, équipe réactive et résultats toujours au rendez-vous. Un partenaire de confiance.',
      date: 'Il y a 1 mois',
      serviceType: 'Bureaux',
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Sophie Bernard',
      role: 'Propriétaire',
      rating: 5,
      comment: 'Après des travaux de rénovation, SB Nettoyage a fait un travail remarquable. Tout était impeccable, même les détails auxquels je n\'aurais pas pensé. Excellent rapport qualité-prix.',
      date: 'Il y a 3 semaines',
      serviceType: 'Après travaux',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Ahmed Benali',
      role: 'Gérant',
      company: 'Restaurant Le Délice',
      rating: 5,
      comment: 'Pour un restaurant, l\'hygiène est primordiale. SB Nettoyage comprend parfaitement nos besoins et s\'adapte à nos horaires. Désinfection parfaite, équipe discrète et efficace.',
      date: 'Il y a 2 mois',
      serviceType: 'Commercial',
      image: '/api/placeholder/80/80'
    },
    {
      id: 5,
      name: 'Claire Rousseau',
      role: 'Particulier',
      rating: 4,
      comment: 'Très satisfaite du service de nettoyage hebdomadaire. L\'équipe est sympathique et fait attention à mes demandes spécifiques. Les produits écologiques sont un vrai plus.',
      date: 'Il y a 1 semaine',
      serviceType: 'Nettoyage régulier',
      image: '/api/placeholder/80/80'
    },
    {
      id: 6,
      name: 'Thomas Leroy',
      role: 'Syndic',
      company: 'Immobilière du Centre',
      rating: 5,
      comment: 'Nous gérons plusieurs immeubles et SB Nettoyage s\'occupe des parties communes. Les résidents sont ravis, et nous apprécions leur professionnalisme et leur réactivité.',
      date: 'Il y a 1 mois',
      serviceType: 'Copropriété',
      image: '/api/placeholder/80/80'
    }
  ];

  const serviceTypes = ['all', ...Array.from(new Set(testimonials.map(t => t.serviceType)))];
  
  const filteredTestimonials = selectedService === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.serviceType === selectedService);

  const stats = {
    totalClients: 500,
    averageRating: 4.9,
    completedProjects: 2500,
    yearsExperience: 10
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Témoignages Clients
          </h1>
          <p className="text-center mt-2 text-green-100">
            Découvrez ce que nos clients disent de nous
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
            <li className="text-deep-plum font-medium">Témoignages</li>
          </ol>
        </nav>

        {/* Statistiques */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-forest-green">{stats.totalClients}+</div>
                <div className="text-gray-600 mt-1">Clients satisfaits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest-green">{stats.averageRating}/5</div>
                <div className="text-gray-600 mt-1">Note moyenne</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest-green">{stats.completedProjects}+</div>
                <div className="text-gray-600 mt-1">Projets réalisés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-forest-green">{stats.yearsExperience}</div>
                <div className="text-gray-600 mt-1">Ans d'expérience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {serviceTypes.map((service) => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedService === service
                    ? 'bg-forest-green text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {service === 'all' ? 'Tous les services' : service}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de témoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-gray-200" />
              
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-deep-plum">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">
                    {testimonial.role}
                    {testimonial.company && ` - ${testimonial.company}`}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-700 mb-4 relative z-10">"{testimonial.comment}"</p>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{testimonial.date}</span>
                <span className="bg-forest-green bg-opacity-10 text-forest-green px-3 py-1 rounded-full text-xs font-semibold">
                  {testimonial.serviceType}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Témoignage vedette */}
        <section className="mb-12">
          <div className="bg-forest-green text-white rounded-lg p-8 md:p-12 text-center">
            <Quote className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <p className="text-xl md:text-2xl mb-6 italic">
              "SB Nettoyage a transformé notre façon de gérer l'entretien de nos locaux. 
              Leur professionnalisme et leur souci du détail sont remarquables. 
              C'est un véritable partenariat basé sur la confiance."
            </p>
            <div className="flex justify-center gap-1 mb-4">
              {renderStars(5)}
            </div>
            <div>
              <p className="font-semibold text-lg">Laurent Dubois</p>
              <p className="text-green-100">PDG, Groupe Innovation</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-deep-plum mb-4">
            Rejoignez Nos Clients Satisfaits
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Découvrez pourquoi tant d'entreprises et de particuliers nous font confiance 
            pour leurs besoins de nettoyage.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-forest-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Obtenir un Devis
            </a>
            <a 
              href="/services" 
              className="bg-white text-forest-green border-2 border-forest-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Voir Nos Services
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;