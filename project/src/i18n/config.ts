import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        services: 'Services',
        booking: 'Réservation',
        login: 'Connexion',
        dashboard: 'Tableau de bord'
      },
      home: {
        title: 'Services de Nettoyage Professionnel',
        subtitle: 'Votre partenaire de confiance pour un environnement propre et sain',
        cta: 'Réserver maintenant',
        features: {
          quality: 'Qualité garantie',
          professional: 'Équipe professionnelle',
          flexible: 'Horaires flexibles'
        }
      },
      services: {
        title: 'Nos Services',
        home_cleaning: 'Nettoyage à domicile',
        office_cleaning: 'Nettoyage de bureaux',
        deep_cleaning: 'Grand nettoyage',
        book_now: 'Réserver'
      },
      footer: {
        contact: 'Contact',
        about: 'À propos',
        terms: 'Conditions',
        privacy: 'Confidentialité'
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: 'Home',
        services: 'Services',
        booking: 'Booking',
        login: 'Login',
        dashboard: 'Dashboard'
      },
      home: {
        title: 'Professional Cleaning Services',
        subtitle: 'Your trusted partner for a clean and healthy environment',
        cta: 'Book now',
        features: {
          quality: 'Quality guaranteed',
          professional: 'Professional team',
          flexible: 'Flexible hours'
        }
      },
      services: {
        title: 'Our Services',
        home_cleaning: 'Home cleaning',
        office_cleaning: 'Office cleaning',
        deep_cleaning: 'Deep cleaning',
        book_now: 'Book now'
      },
      footer: {
        contact: 'Contact',
        about: 'About',
        terms: 'Terms',
        privacy: 'Privacy'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;