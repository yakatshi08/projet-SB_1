import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Phone, Mail, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-deep-plum text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-golden-orange" />
              <span className="text-xl font-bold text-forest-green">SB-Nettoyage</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Votre partenaire de confiance pour tous vos besoins de nettoyage. 
              Nous offrons des services professionnels adaptés à vos exigences.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-golden-orange" />
                <span className="text-forest-green">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-golden-orange" />
                <span className="text-forest-green">contact@sb-nettoyage.fr</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-golden-orange mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">Nettoyage à domicile</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">Nettoyage de bureaux</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">Grand nettoyage</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">Nettoyage après travaux</a></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold text-golden-orange mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">{t('footer.about')}</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">{t('footer.contact')}</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">{t('footer.terms')}</a></li>
              <li><a href="#" className="text-forest-green hover:text-golden-orange transition-colors duration-200">{t('footer.privacy')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © 2024 SB-Nettoyage. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;