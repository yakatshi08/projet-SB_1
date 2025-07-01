import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookingWizard, BookingConfirmation } from '../components/booking';
import { Booking } from '../types/booking.types';
import { useBooking } from '../hooks/useBooking';

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const { generateQuotePDF } = useBooking();

  const handleBookingComplete = async (booking: Booking) => {
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Réservation créée avec succès:', data);
        booking.id = data.bookingId;
      } else {
        console.warn('Réponse non valide du serveur:', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi au backend:', error);
    }

    setConfirmedBooking(booking);
    setIsConfirmed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = async () => {
    if (!confirmedBooking) return;

    const pdfBlob = await generateQuotePDF(confirmedBooking);
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis-${confirmedBooking.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (!confirmedBooking) return;

    const shareData = {
      title: 'Devis SB Nettoyage',
      text: `Devis pour ${confirmedBooking.serviceType} - ${confirmedBooking.surface}m²`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Lien copié dans le presse-papier !');
      }
    } catch (err) {
      console.error('Erreur lors du partage:', err);
    }
  };

  const handleNewBooking = () => {
    setIsConfirmed(false);
    setConfirmedBooking(null);
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <div className="bg-forest-green text-white py-8">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            {isConfirmed ? 'Réservation Confirmée' : t('booking.title')}
          </h1>
          <p className="text-center mt-2 text-green-100">
            {isConfirmed
              ? 'Votre demande a été enregistrée avec succès'
              : 'Obtenez un devis instantané en quelques clics'}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {!isConfirmed ? (
          <>
            <nav className="mb-8 text-sm">
              <ol className="flex items-center space-x-2">
                <li>
                  <a href="/" className="text-gray-600 hover:text-forest-green">Accueil</a>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-deep-plum font-medium">Réservation</li>
              </ol>
            </nav>

            <BookingWizard onComplete={handleBookingComplete} />

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-deep-plum">💯 Satisfaction Garantie</h3>
                <p className="text-gray-600 text-sm">Service professionnel avec garantie de résultat ou remboursement</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-deep-plum">🔒 Paiement Sécurisé</h3>
                <p className="text-gray-600 text-sm">Vos données sont protégées et vos paiements 100% sécurisés</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg mb-2 text-deep-plum">📞 Support 24/7</h3>
                <p className="text-gray-600 text-sm">Une équipe dédiée pour répondre à toutes vos questions</p>
              </div>
            </div>
          </>
        ) : (
          confirmedBooking && (
            <BookingConfirmation
              booking={confirmedBooking}
              onDownloadPDF={handleDownloadPDF}
              onPrint={handlePrint}
              onShare={handleShare}
              onNewBooking={handleNewBooking}
            />
          )
        )}
      </div>
    </div>
  );
};

export default BookingPage;