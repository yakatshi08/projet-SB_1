import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, MapPin, Home } from 'lucide-react';

const bookingSchema = z.object({
  date: z.string().min(1, 'La date est requise'),
  time: z.string().min(1, 'L\'heure est requise'),
  address: z.string().min(5, 'L\'adresse doit contenir au moins 5 caractères'),
  serviceType: z.string().min(1, 'Le type de service est requis'),
  frequency: z.string().min(1, 'La fréquence est requise'),
  surface: z.number().min(1, 'La surface doit être supérieure à 0'),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const BookingForm: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simulation d'envoi de données
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Données de réservation:', data);
      alert('Réservation envoyée avec succès !');
      reset();
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-forest-green mb-2">Réserver un service</h2>
        <p className="text-gray-600">Remplissez le formulaire pour planifier votre intervention</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Date et heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
              <Calendar className="h-4 w-4" />
              <span>Date souhaitée</span>
            </label>
            <input
              type="date"
              {...register('date')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
              <Clock className="h-4 w-4" />
              <span>Heure souhaitée</span>
            </label>
            <select
              {...register('time')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
            >
              <option value="">Sélectionner une heure</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
              <option value="17:00">17:00</option>
            </select>
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
            <MapPin className="h-4 w-4" />
            <span>Adresse d'intervention</span>
          </label>
          <input
            type="text"
            {...register('address')}
            placeholder="123 Rue de la Paix, 75001 Paris"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        {/* Type de service et fréquence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-forest-green mb-2">
              <Home className="h-4 w-4" />
              <span>Type de service</span>
            </label>
            <select
              {...register('serviceType')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
            >
              <option value="">Sélectionner un service</option>
              <option value="home_cleaning">Nettoyage à domicile</option>
              <option value="office_cleaning">Nettoyage de bureaux</option>
              <option value="deep_cleaning">Grand nettoyage</option>
              <option value="post_construction">Après travaux</option>
            </select>
            {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-forest-green mb-2 block">Fréquence</label>
            <select
              {...register('frequency')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
            >
              <option value="">Sélectionner la fréquence</option>
              <option value="once">Une fois</option>
              <option value="weekly">Hebdomadaire</option>
              <option value="biweekly">Bi-mensuel</option>
              <option value="monthly">Mensuel</option>
            </select>
            {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency.message}</p>}
          </div>
        </div>

        {/* Surface */}
        <div>
          <label className="text-sm font-medium text-forest-green mb-2 block">Surface (m²)</label>
          <input
            type="number"
            {...register('surface', { valueAsNumber: true })}
            placeholder="Ex: 80"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
          />
          {errors.surface && <p className="text-red-500 text-sm mt-1">{errors.surface.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-forest-green mb-2 block">Notes supplémentaires</label>
          <textarea
            {...register('notes')}
            rows={3}
            placeholder="Informations complémentaires, accès, particularités..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-orange focus:border-transparent"
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-golden-orange text-white font-medium py-3 px-4 rounded-lg hover:bg-golden-orange/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-golden-orange focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;