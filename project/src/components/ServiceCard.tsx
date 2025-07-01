import React from 'react';
import { useTranslation } from 'react-i18next';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  features: string[];
  onBook: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  price,
  features,
  onBook
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <div className="p-6">
        {/* Icon et titre */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-golden-orange/10 rounded-lg">
            <Icon className="h-6 w-6 text-golden-orange" />
          </div>
          <h3 className="text-xl font-semibold text-forest-green">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>

        {/* Prix */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-forest-green">{price}</span>
          <span className="text-gray-500 ml-1">/ intervention</span>
        </div>

        {/* Fonctionnalités */}
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-golden-orange rounded-full"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Bouton de réservation */}
        <button
          onClick={onBook}
          className="w-full bg-golden-orange text-white font-medium py-3 px-4 rounded-lg hover:bg-golden-orange/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2"
        >
          {t('services.book_now')}
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;