import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Calendar, 
  Clock, 
  Home, 
  Building, 
  Factory, 
  ChevronRight, 
  ChevronLeft,
  Check,
  AlertCircle,
  Sparkles,
  Package
} from 'lucide-react';
import { Booking } from '../../types/booking.types';
import { useBooking } from '../../hooks/useBooking';

// Schéma de validation Zod
const bookingSchema = z.object({
  // Étape 1: Type de service
  serviceType: z.enum(['bureau', 'commerce', 'industriel'], {
    required_error: "Veuillez sélectionner un type de service"
  }),
  
  // Étape 2: Détails du service
  surface: z.number({
    required_error: "La surface est requise",
    invalid_type_error: "Veuillez entrer un nombre valide"
  }).min(10, "La surface minimum est de 10m²").max(5000, "La surface maximum est de 5000m²"),
  
  frequency: z.enum(['unique', 'hebdomadaire', 'bihebdomadaire', 'mensuel'], {
    required_error: "Veuillez sélectionner une fréquence"
  }),
  
  additionalServices: z.array(z.string()).optional(),
  
  // Étape 3: Date et heure
  date: z.date({
    required_error: "Veuillez sélectionner une date"
  }).min(new Date(), "La date ne peut pas être dans le passé"),
  
  timeSlot: z.string({
    required_error: "Veuillez sélectionner un créneau horaire"
  }),
  
  // Étape 4: Informations de contact
  companyName: z.string().min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères"),
  contactName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().regex(/^[0-9+\-\s]+$/, "Numéro de téléphone invalide").min(10, "Numéro trop court"),
  
  // Optionnel
  specialInstructions: z.string().optional(),
  accessCode: z.string().optional()
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Services additionnels disponibles
const additionalServicesOptions = [
  { id: 'vitres', label: 'Nettoyage des vitres', icon: Sparkles, price: 50 },
  { id: 'sanitaires', label: 'Désinfection sanitaires renforcée', icon: Sparkles, price: 30 },
  { id: 'dechets', label: 'Gestion des déchets spéciaux', icon: Package, price: 40 },
  { id: 'tapis', label: 'Shampoing tapis/moquettes', icon: Sparkles, price: 60 }
];

// Créneaux horaires disponibles
const timeSlots = [
  { value: '06:00', label: '6h00 - 8h00', shift: 'Matin' },
  { value: '08:00', label: '8h00 - 10h00', shift: 'Matin' },
  { value: '10:00', label: '10h00 - 12h00', shift: 'Matin' },
  { value: '14:00', label: '14h00 - 16h00', shift: 'Après-midi' },
  { value: '16:00', label: '16h00 - 18h00', shift: 'Après-midi' },
  { value: '18:00', label: '18h00 - 20h00', shift: 'Soir' },
  { value: '20:00', label: '20h00 - 22h00', shift: 'Soir' }
];

interface BookingWizardProps {
  onComplete?: (booking: Booking) => void;
}

const BookingWizard: React.FC<BookingWizardProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  
  // Import du hook useBooking (UNE SEULE FOIS)
  const { createBooking } = useBooking();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange'
  });

  const watchedValues = watch();

  // Calcul du prix estimé
  React.useEffect(() => {
    if (watchedValues.serviceType && watchedValues.surface && watchedValues.frequency) {
      let basePrice = 0;
      
      // Prix de base selon le type
      switch (watchedValues.serviceType) {
        case 'bureau':
          basePrice = watchedValues.surface * 2.5;
          break;
        case 'commerce':
          basePrice = watchedValues.surface * 3;
          break;
        case 'industriel':
          basePrice = watchedValues.surface * 4;
          break;
      }
      
      // Réduction selon la fréquence
      switch (watchedValues.frequency) {
        case 'hebdomadaire':
          basePrice *= 0.8;
          break;
        case 'bihebdomadaire':
          basePrice *= 0.85;
          break;
        case 'mensuel':
          basePrice *= 0.9;
          break;
      }
      
      // Ajouter les services additionnels
      const additionalCost = (watchedValues.additionalServices || [])
        .reduce((sum, serviceId) => {
          const service = additionalServicesOptions.find(s => s.id === serviceId);
          return sum + (service?.price || 0);
        }, 0);
      
      setEstimatedPrice(Math.round(basePrice + additionalCost));
    }
  }, [watchedValues.serviceType, watchedValues.surface, watchedValues.frequency, watchedValues.additionalServices]);

  // Fonction de soumission du formulaire
  const onSubmit = async (data: BookingFormData) => {
    alert('Envoi en cours...');
    
    try {
      // Envoyer au backend
      const result = await createBooking(data);
      
      if (result.success) {
        alert('Réservation créée avec succès !');
        
        // Créer l'objet booking pour la page de confirmation
        const booking: Booking = {
          id: result.bookingId!,
          ...data,
          status: 'pending',
          estimatedPrice,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        if (onComplete) {
          onComplete(booking);
        }
      } else {
        alert('Erreur: ' + result.error);
      }
    } catch (error) {
      alert('Erreur de connexion au serveur');
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate as any);
    
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getFieldsForStep = (step: number) => {
    switch (step) {
      case 1:
        return ['serviceType'];
      case 2:
        return ['surface', 'frequency', 'additionalServices'];
      case 3:
        return ['date', 'timeSlot'];
      case 4:
        return ['companyName', 'contactName', 'email', 'phone'];
      default:
        return [];
    }
  };

  // Générer les dates disponibles (30 prochains jours, sauf weekends)
  const availableDates = Array.from({ length: 30 }, (_, i) => addDays(new Date(), i + 1))
    .filter(date => {
      const day = date.getDay();
      return day !== 0 && day !== 6; // Exclure dimanche (0) et samedi (6)
    });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  currentStep >= step
                    ? 'bg-forest-green text-white'
                    : 'bg-warm-gray text-gray-600'
                }`}
              >
                {currentStep > step ? <Check size={20} /> : step}
              </div>
              {step < 4 && (
                <div
                  className={`w-20 md:w-32 h-1 transition-all duration-300 ${
                    currentStep > step ? 'bg-forest-green' : 'bg-warm-gray'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Type de service</span>
          <span>Détails</span>
          <span>Date & Heure</span>
          <span>Contact</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Étape 1: Type de service */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-plum mb-4">
              Quel type d'espace souhaitez-vous faire nettoyer ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'bureau', label: 'Bureaux', icon: Building, description: 'Espaces de travail, open spaces, salles de réunion' },
                { value: 'commerce', label: 'Commerce', icon: Home, description: 'Boutiques, restaurants, showrooms' },
                { value: 'industriel', label: 'Industriel', icon: Factory, description: 'Entrepôts, usines, ateliers' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
                    watchedValues.serviceType === option.value
                      ? 'border-forest-green bg-forest-green/5'
                      : 'border-gray-200 hover:border-golden-orange'
                  }`}
                >
                  <input
                    type="radio"
                    value={option.value}
                    {...register('serviceType')}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center text-center space-y-3">
                    <option.icon 
                      size={48} 
                      className={watchedValues.serviceType === option.value ? 'text-forest-green' : 'text-gray-600'}
                    />
                    <h3 className="font-semibold text-lg">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  {watchedValues.serviceType === option.value && (
                    <div className="absolute top-2 right-2">
                      <Check className="text-forest-green" size={24} />
                    </div>
                  )}
                </label>
              ))}
            </div>
            
            {errors.serviceType && (
              <p className="text-red-500 text-sm flex items-center gap-1">
                <AlertCircle size={16} />
                {errors.serviceType.message}
              </p>
            )}
          </div>
        )}

        {/* Étape 2: Détails du service */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-plum mb-4">
              Détails de votre espace
            </h2>
            
            {/* Surface */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Surface à nettoyer (m²)
              </label>
              <input
                type="number"
                {...register('surface', { valueAsNumber: true })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent transition-all"
                placeholder="Ex: 250"
              />
              {errors.surface && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.surface.message}
                </p>
              )}
            </div>

            {/* Fréquence */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fréquence de nettoyage
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { value: 'unique', label: 'Ponctuel' },
                  { value: 'hebdomadaire', label: 'Hebdomadaire', discount: '-20%' },
                  { value: 'bihebdomadaire', label: '2x/semaine', discount: '-15%' },
                  { value: 'mensuel', label: 'Mensuel', discount: '-10%' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                      watchedValues.frequency === option.value
                        ? 'border-forest-green bg-forest-green/5'
                        : 'border-gray-200 hover:border-golden-orange'
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...register('frequency')}
                      className="sr-only"
                    />
                    <div>
                      <p className="font-medium">{option.label}</p>
                      {option.discount && (
                        <span className="text-xs text-forest-green font-semibold">{option.discount}</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
              {errors.frequency && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.frequency.message}
                </p>
              )}
            </div>

            {/* Services additionnels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Services additionnels (optionnel)
              </label>
              <div className="space-y-3">
                {additionalServicesOptions.map((service) => (
                  <label
                    key={service.id}
                    className="flex items-center p-3 border-2 rounded-lg cursor-pointer hover:bg-warm-gray transition-all"
                  >
                    <input
                      type="checkbox"
                      value={service.id}
                      {...register('additionalServices')}
                      className="w-5 h-5 text-forest-green rounded focus:ring-forest-green"
                    />
                    <service.icon size={20} className="ml-3 text-golden-orange" />
                    <span className="ml-3 flex-1">{service.label}</span>
                    <span className="font-semibold text-forest-green">+{service.price}€</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Prix estimé */}
            {estimatedPrice > 0 && (
              <div className="bg-forest-green/10 rounded-lg p-4 mt-6">
                <p className="text-sm text-gray-600">Prix estimé par intervention</p>
                <p className="text-3xl font-bold text-forest-green">{estimatedPrice}€</p>
                {watchedValues.frequency !== 'unique' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Réduction appliquée pour contrat {watchedValues.frequency}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Étape 3: Date et heure */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-plum mb-4">
              Quand souhaitez-vous commencer ?
            </h2>
            
            {/* Sélection de la date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline mr-2" size={16} />
                Date de première intervention
              </label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {availableDates.slice(0, 15).map((date) => (
                      <button
                        key={date.toISOString()}
                        type="button"
                        onClick={() => field.onChange(date)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          field.value?.toDateString() === date.toDateString()
                            ? 'border-forest-green bg-forest-green text-white'
                            : 'border-gray-200 hover:border-golden-orange'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {format(date, 'EEE', { locale: fr })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(date, 'd', { locale: fr })}
                        </div>
                        <div className="text-xs">
                          {format(date, 'MMM', { locale: fr })}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Sélection du créneau */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline mr-2" size={16} />
                Créneau horaire préféré
              </label>
              <div className="space-y-4">
                {['Matin', 'Après-midi', 'Soir'].map((shift) => (
                  <div key={shift}>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">{shift}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {timeSlots
                        .filter((slot) => slot.shift === shift)
                        .map((slot) => (
                          <label
                            key={slot.value}
                            className={`cursor-pointer rounded-lg border-2 p-3 text-center transition-all ${
                              watchedValues.timeSlot === slot.value
                                ? 'border-forest-green bg-forest-green text-white'
                                : 'border-gray-200 hover:border-golden-orange'
                            }`}
                          >
                            <input
                              type="radio"
                              value={slot.value}
                              {...register('timeSlot')}
                              className="sr-only"
                            />
                            <span className="text-sm font-medium">{slot.label}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              {errors.timeSlot && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={16} />
                  {errors.timeSlot.message}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Étape 4: Informations de contact */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-deep-plum mb-4">
              Vos informations de contact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  {...register('companyName')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="SB Nettoyage SARL"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du contact
                </label>
                <input
                  type="text"
                  {...register('contactName')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="Jean Dupont"
                />
                {errors.contactName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.contactName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="contact@entreprise.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructions spéciales (optionnel)
              </label>
              <textarea
                {...register('specialInstructions')}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                placeholder="Ex: Code d'accès, consignes particulières..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code d'accès (optionnel)
              </label>
              <input
                type="text"
                {...register('accessCode')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-green focus:border-transparent"
                placeholder="Ex: 1234A"
              />
            </div>

            {/* Récapitulatif */}
            <div className="bg-warm-gray rounded-lg p-6 mt-6">
              <h3 className="font-semibold text-lg mb-4">Récapitulatif de votre demande</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de service:</span>
                  <span className="font-medium capitalize">{watchedValues.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Surface:</span>
                  <span className="font-medium">{watchedValues.surface} m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fréquence:</span>
                  <span className="font-medium capitalize">{watchedValues.frequency}</span>
                </div>
                {watchedValues.date && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de début:</span>
                    <span className="font-medium">
                      {format(watchedValues.date, 'dd MMMM yyyy', { locale: fr })}
                    </span>
                  </div>
                )}
                {watchedValues.timeSlot && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Créneau:</span>
                    <span className="font-medium">
                      {timeSlots.find(s => s.value === watchedValues.timeSlot)?.label}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Prix estimé:</span>
                    <span className="text-forest-green">{estimatedPrice}€ / intervention</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Boutons de navigation */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevStep}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 1
                ? 'invisible'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            <ChevronLeft size={20} />
            Précédent
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-forest-green hover:bg-forest-green/90 text-white rounded-lg font-medium transition-all"
            >
              Suivant
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 bg-golden-orange hover:bg-golden-orange/90 text-white rounded-lg font-medium transition-all"
            >
              <Check size={20} />
              Confirmer la réservation
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingWizard;