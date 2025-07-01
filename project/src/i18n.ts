import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      'nav.home': 'Accueil',
      'nav.services': 'Services',
      'nav.booking': 'Réserver',
      'nav.login': 'Connexion',
      'nav.about': 'À propos',
      'nav.contact': 'Contact',
      'nav.pricing': 'Tarifs',
      'nav.faq': 'FAQ',
      'nav.testimonials': 'Témoignages',
      'nav.gallery': 'Galerie',
      'home.title': 'Des solutions adaptées à vos besoins pour des lieux toujours propres, sûrs et accueillants.',
      'home.subtitle': 'L\'excellence du nettoyage professionnel',
      'home.cta': 'Réserver maintenant',
      'services.title': 'Nos Services',
      'booking.title': 'Réserver un Service',
      'login.title': 'Connexion',
      'about.title': 'À Propos de Nous',
      'contact.title': 'Contactez-nous',
      'pricing.title': 'Nos Tarifs',
      'faq.title': 'Questions Fréquentes',
      'testimonials.title': 'Témoignages Clients',
      'gallery.title': 'Galerie Avant/Après'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;