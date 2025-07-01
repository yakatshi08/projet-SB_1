import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Building, 
  Mail, 
  Phone,
  Download,
  Share2,
  Printer
} from 'lucide-react';
import { Booking } from '../../types/booking.types';

interface BookingConfirmationProps {
  booking: Booking;
  onDownloadPDF?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  onNewBooking?: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onDownloadPDF,
  onShare,
  onPrint,
  onNewBooking
}) => {
  const getServiceLabel = (type: string) => {
    const labels: Record<string, string> = {
      bureau: 'Nettoyage de bureaux',
      commerce: 'Nettoyage commercial',
      industriel: 'Nettoyage industriel'
    };
    return labels[type] || type;
  };

  const getFrequencyLabel = (frequency: string) => {
    const labels: Record<string, string> = {
      unique: 'Intervention ponctuelle',
      hebdomadaire: 'Toutes les semaines',
      bihebdomadaire: '2 fois par semaine',
      mensuel: 'Tous les mois'
    };
    return labels[frequency] || frequency;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* En-tête de succès */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-forest-green/10 rounded-full mb-4">
          <CheckCircle className="w-12 h-12 text-forest-green" />
        </div>
        <h1 className="text-3xl font-bold text-deep-plum mb-2">
          Réservation confirmée !
        </h1>
        <p className="text-gray-600">
          Votre demande a été enregistrée avec succès
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Numéro de réservation : <span className="font-mono font-bold">{booking.id}</span>
        </p>
      </div>

      {/* Détails de la réservation */}
      <div className="bg-warm-gray rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold text-deep-plum mb-4">
          Récapitulatif de votre réservation
        </h2>
        
        <div className="space-y-4">
          {/* Service */}
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-golden-orange mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Service</p>
              <p className="font-medium">{getServiceLabel(booking.serviceType)}</p>
              <p className="text-sm text-gray-600">Surface : {booking.surface} m²</p>
            </div>
          </div>

          {/* Date et heure */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-golden-orange mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Date de début</p>
              <p className="font-medium">
                {format(booking.date, 'EEEE d MMMM yyyy', { locale: fr })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-golden-orange mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Créneau horaire</p>
              <p className="font-medium">{booking.timeSlot}</p>
              <p className="text-sm text-gray-600">{getFrequencyLabel(booking.frequency)}</p>
            </div>
          </div>

          {/* Services additionnels */}
          {booking.additionalServices && booking.additionalServices.length > 0 && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Services additionnels</p>
              <ul className="space-y-1">
                {booking.additionalServices.map((service, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-golden-orange rounded-full" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prix */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Prix estimé par intervention</span>
              <span className="text-2xl font-bold text-forest-green">
                {booking.estimatedPrice}€
              </span>
            </div>
            {booking.frequency !== 'unique' && (
              <p className="text-sm text-gray-600 text-right mt-1">
                Tarif préférentiel appliqué
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Informations de contact */}
      <div className="bg-blue-50 rounded-xl p-6 mb-6">
        <h3 className="font-semibold text-deep-plum mb-3">
          Prochaines étapes
        </h3>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-forest-green" />
            Un email de confirmation a été envoyé à <strong>{booking.email}</strong>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-forest-green" />
            Notre équipe vous contactera sous 24h au <strong>{booking.phone}</strong>
          </p>
        </div>
      </div>

      {/* Instructions spéciales */}
      {booking.specialInstructions && (
        <div className="bg-yellow-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-deep-plum mb-2">
            Instructions spéciales
          </h3>
          <p className="text-sm text-gray-700">{booking.specialInstructions}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-center">
        {onDownloadPDF && (
          <button
            onClick={onDownloadPDF}
            className="flex items-center gap-2 px-6 py-3 bg-forest-green hover:bg-forest-green/90 text-white rounded-lg font-medium transition-all"
          >
            <Download size={20} />
            Télécharger le devis
          </button>
        )}
        
        {onPrint && (
          <button
            onClick={onPrint}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
          >
            <Printer size={20} />
            Imprimer
          </button>
        )}
        
        {onShare && (
          <button
            onClick={onShare}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
          >
            <Share2 size={20} />
            Partager
          </button>
        )}
      </div>

      {/* Nouvelle réservation */}
      {onNewBooking && (
        <div className="text-center mt-8 pt-8 border-t">
          <p className="text-gray-600 mb-4">Besoin d'un autre service ?</p>
          <button
            onClick={onNewBooking}
            className="px-6 py-3 bg-golden-orange hover:bg-golden-orange/90 text-white rounded-lg font-medium transition-all"
          >
            Faire une nouvelle réservation
          </button>
        </div>
      )}

      {/* Informations de contact support */}
      <div className="text-center mt-8 text-sm text-gray-500">
        <p>Des questions ? Contactez-nous :</p>
        <p className="font-medium">
          <a href="tel:0123456789" className="hover:text-forest-green">
            01 23 45 67 89
          </a>
          {' • '}
          <a href="mailto:contact@sb-nettoyage.fr" className="hover:text-forest-green">
            contact@sb-nettoyage.fr
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookingConfirmation;