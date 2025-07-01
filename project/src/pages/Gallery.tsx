import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [showBefore, setShowBefore] = useState(true);

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      category: 'Bureaux',
      title: 'Open Space Tech Company',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Nettoyage complet d\'un open space de 200m² incluant postes de travail, sols et vitres.'
    },
    {
      id: 2,
      category: 'Après travaux',
      title: 'Rénovation Appartement Paris',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Nettoyage post-rénovation avec élimination de la poussière et des débris.'
    },
    {
      id: 3,
      category: 'Copropriété',
      title: 'Hall d\'Immeuble Haussmannien',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Restauration de l\'éclat d\'un hall d\'entrée avec traitement du marbre.'
    },
    {
      id: 4,
      category: 'Commercial',
      title: 'Restaurant Gastronomique',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Dégraissage et désinfection complète de cuisine professionnelle.'
    },
    {
      id: 5,
      category: 'Domicile',
      title: 'Maison Familiale',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Nettoyage en profondeur d\'une maison de 150m² sur 3 niveaux.'
    },
    {
      id: 6,
      category: 'Vitres',
      title: 'Façade Vitrée Entreprise',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Nettoyage de vitres en hauteur avec nacelle élévatrice.'
    },
    {
      id: 7,
      category: 'Tapis',
      title: 'Moquette Salle de Conférence',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Shampouinage et traitement anti-taches de moquette haute qualité.'
    },
    {
      id: 8,
      category: 'Désinfection',
      title: 'Cabinet Médical',
      beforeImage: '/api/placeholder/600/400',
      afterImage: '/api/placeholder/600/400',
      description: 'Protocole de désinfection complet aux normes sanitaires.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setShowBefore(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredItems[newIndex]);
    setShowBefore(true);
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Galerie Avant/Après
          </h1>
          <p className="text-center mt-2 text-green-100">
            Découvrez la transformation que nous apportons
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
            <li className="text-deep-plum font-medium">Galerie</li>
          </ol>
        </nav>

        {/* Introduction */}
        <section className="mb-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            Nos résultats parlent d'eux-mêmes. Découvrez comment nous transformons 
            les espaces grâce à notre expertise et notre attention aux détails. 
            Chaque projet est unique et mérite notre meilleur service.
          </p>
        </section>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? 'bg-forest-green text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category === 'all' ? 'Tous les projets' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Grille de galerie */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(item)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.beforeImage}
                  alt={`Avant - ${item.title}`}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={item.afterImage}
                  alt={`Après - ${item.title}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-sm font-semibold">Survolez pour voir après</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Maximize2 className="w-5 h-5 text-white bg-black/50 rounded p-1" />
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block bg-forest-green bg-opacity-10 text-forest-green text-xs font-semibold px-2 py-1 rounded-full mb-2">
                  {item.category}
                </span>
                <h3 className="font-semibold text-deep-plum mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 text-white hover:text-gray-300 transition"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 text-white hover:text-gray-300 transition"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-4xl w-full">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={showBefore ? selectedImage.beforeImage : selectedImage.afterImage}
                    alt={showBefore ? 'Avant' : 'Après'}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg">
                    <button
                      onClick={() => setShowBefore(true)}
                      className={`px-4 py-2 rounded-l-full transition ${
                        showBefore
                          ? 'bg-forest-green text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Avant
                    </button>
                    <button
                      onClick={() => setShowBefore(false)}
                      className={`px-4 py-2 rounded-r-full transition ${
                        !showBefore
                          ? 'bg-forest-green text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      Après
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-forest-green bg-opacity-10 text-forest-green text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-xl font-bold text-deep-plum mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-600">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to action */}
        <section className="mt-16 bg-forest-green text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à Transformer Votre Espace ?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour obtenir un devis gratuit et découvrir 
            comment nous pouvons redonner vie à vos espaces.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/booking" 
              className="bg-white text-forest-green px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Demander un Devis
            </a>
            <a 
              href="/contact" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-forest-green transition"
            >
              Nous Contacter
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;