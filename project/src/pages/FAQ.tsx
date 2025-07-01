import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqData: FAQItem[] = [
    // Services
    {
      category: 'Services',
      question: 'Quels types de services de nettoyage proposez-vous ?',
      answer: 'Nous proposons une gamme complète de services : nettoyage régulier de bureaux et domiciles, nettoyage après travaux, désinfection COVID-19, lavage de vitres, nettoyage de tapis et moquettes, et services de conciergerie.'
    },
    {
      category: 'Services',
      question: 'Intervenez-vous le weekend ?',
      answer: 'Oui, nous proposons des interventions le samedi pour les formules Professionnel et Entreprise. Le dimanche est réservé aux urgences uniquement, avec un supplément tarifaire.'
    },
    {
      category: 'Services',
      question: 'Proposez-vous des services d\'urgence ?',
      answer: 'Oui, nous offrons un service d\'urgence 24/7 pour les situations critiques comme les dégâts des eaux, les sinistres, ou les besoins de désinfection urgente.'
    },
    
    // Tarification
    {
      category: 'Tarification',
      question: 'Comment sont calculés vos tarifs ?',
      answer: 'Nos tarifs dépendent de plusieurs facteurs : la surface à nettoyer, la fréquence d\'intervention, le type de service demandé, et la localisation. Nous proposons des forfaits mensuels avantageux ou des interventions ponctuelles.'
    },
    {
      category: 'Tarification',
      question: 'Les devis sont-ils gratuits ?',
      answer: 'Oui, tous nos devis sont entièrement gratuits et sans engagement. Un expert se déplace pour évaluer vos besoins et vous proposer une offre personnalisée sous 24h.'
    },
    {
      category: 'Tarification',
      question: 'Acceptez-vous les chèques CESU ?',
      answer: 'Oui, nous acceptons les chèques CESU pour les services à domicile. Nous sommes agréés services à la personne, ce qui vous permet de bénéficier d\'une réduction d\'impôt de 50%.'
    },
    
    // Réservation
    {
      category: 'Réservation',
      question: 'Comment puis-je réserver un service ?',
      answer: 'Vous pouvez réserver directement sur notre site web via le formulaire de réservation, par téléphone au 01 23 45 67 89, ou par email à contact@sbnettoyage.fr. La réservation en ligne est disponible 24/7.'
    },
    {
      category: 'Réservation',
      question: 'Puis-je annuler ou modifier ma réservation ?',
      answer: 'Oui, vous pouvez annuler ou modifier votre réservation jusqu\'à 24h avant l\'intervention sans frais. Au-delà, des frais d\'annulation peuvent s\'appliquer selon nos CGV.'
    },
    {
      category: 'Réservation',
      question: 'Combien de temps à l\'avance dois-je réserver ?',
      answer: 'Pour une intervention ponctuelle, nous recommandons de réserver au moins 48h à l\'avance. Pour les contrats réguliers, nous pouvons commencer sous 24h selon nos disponibilités.'
    },
    
    // Qualité et Garanties
    {
      category: 'Qualité',
      question: 'Quelles garanties offrez-vous ?',
      answer: 'Nous offrons une garantie satisfaction à 100%. Si vous n\'êtes pas satisfait du service, nous revenons gratuitement dans les 24h pour corriger le problème. Nous sommes également assurés en responsabilité civile professionnelle.'
    },
    {
      category: 'Qualité',
      question: 'Vos employés sont-ils formés ?',
      answer: 'Tous nos agents sont rigoureusement sélectionnés et suivent une formation continue. Ils sont formés aux dernières techniques de nettoyage, aux normes d\'hygiène et de sécurité, et à l\'utilisation de produits écologiques.'
    },
    {
      category: 'Qualité',
      question: 'Utilisez-vous des produits écologiques ?',
      answer: 'Oui, nous utilisons exclusivement des produits écologiques certifiés, respectueux de l\'environnement et de votre santé. Sur demande, nous pouvons utiliser vos propres produits.'
    },
    
    // Pratique
    {
      category: 'Pratique',
      question: 'Dois-je être présent pendant le nettoyage ?',
      answer: 'Non, vous n\'êtes pas obligé d\'être présent. Beaucoup de nos clients nous confient leurs clés ou codes d\'accès. Nous sommes assurés et nos employés sont dignes de confiance.'
    },
    {
      category: 'Pratique',
      question: 'Que dois-je préparer avant votre intervention ?',
      answer: 'Idéalement, rangez les objets de valeur et dégagez les surfaces à nettoyer. Pour un premier nettoyage, une visite préalable permet d\'identifier les besoins spécifiques.'
    },
    {
      category: 'Pratique',
      question: 'Dans quelles zones géographiques intervenez-vous ?',
      answer: 'Nous intervenons dans toute l\'Île-de-France. Pour les contrats importants, nous pouvons étudier des interventions dans d\'autres régions.'
    }
  ];

  const categories = ['all', ...Array.from(new Set(faqData.map(item => item.category)))];

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Header */}
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            Questions Fréquentes
          </h1>
          <p className="text-center mt-2 text-green-100">
            Trouvez rapidement les réponses à vos questions
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
            <li className="text-deep-plum font-medium">FAQ</li>
          </ol>
        </nav>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher une question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
              </div>
            </div>
            
            {/* Filtres par catégorie */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category
                      ? 'bg-forest-green text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'Toutes' : category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Liste des FAQ */}
        <div className="space-y-4">
          {filteredFAQ.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">Aucune question ne correspond à votre recherche.</p>
            </div>
          ) : (
            filteredFAQ.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-forest-green bg-opacity-10 text-forest-green text-xs font-semibold rounded-full mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-deep-plum">{item.question}</h3>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact support */}
        <section className="mt-12 bg-forest-green text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="mb-6">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter !
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/contact" 
              className="bg-white text-forest-green px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Nous Contacter
            </a>
            <a 
              href="tel:0123456789" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-forest-green transition"
            >
              01 23 45 67 89
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQ;