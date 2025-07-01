import { useState, useCallback, useEffect } from 'react';
import { Booking, TimeSlot } from '../types/booking.types';

// Configuration des prix
const PRICING_CONFIG = {
  bureau: {
    basePrice: 2.5, // €/m²
    name: 'Bureaux'
  },
  commerce: {
    basePrice: 3.0, // €/m²
    name: 'Commerce'
  },
  industriel: {
    basePrice: 4.0, // €/m²
    name: 'Industriel'
  }
};

const FREQUENCY_DISCOUNTS = {
  unique: 0,
  hebdomadaire: 0.20, // 20% de réduction
  bihebdomadaire: 0.15, // 15% de réduction
  mensuel: 0.10 // 10% de réduction
};

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculer le prix estimé
  const calculatePrice = useCallback((
    serviceType: 'bureau' | 'commerce' | 'industriel',
    surface: number,
    frequency: 'unique' | 'hebdomadaire' | 'bihebdomadaire' | 'mensuel',
    additionalServices: { price: number }[] = []
  ) => {
    // Prix de base
    let basePrice = surface * PRICING_CONFIG[serviceType].basePrice;
    
    // Appliquer la réduction selon la fréquence
    const discount = FREQUENCY_DISCOUNTS[frequency];
    basePrice = basePrice * (1 - discount);
    
    // Ajouter les services additionnels
    const additionalCost = additionalServices.reduce(
      (sum, service) => sum + service.price, 
      0
    );
    
    return {
      basePrice: Math.round(basePrice),
      additionalCost,
      discount: discount * 100,
      totalPrice: Math.round(basePrice + additionalCost)
    };
  }, []);

  // Vérifier la disponibilité d'un créneau
  const checkAvailability = useCallback(async (
    date: Date,
    timeSlot: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Pour la démo, on considère que 80% des créneaux sont disponibles
      return Math.random() > 0.2;
    } catch (err) {
      setError('Erreur lors de la vérification de disponibilité');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer les créneaux disponibles pour une date
  const getAvailableSlots = useCallback(async (
    date: Date
  ): Promise<TimeSlot[]> => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Créneaux de base
      const baseSlots: TimeSlot[] = [
        { value: '06:00', label: '6h00 - 8h00', shift: 'Matin', available: true },
        { value: '08:00', label: '8h00 - 10h00', shift: 'Matin', available: true },
        { value: '10:00', label: '10h00 - 12h00', shift: 'Matin', available: true },
        { value: '14:00', label: '14h00 - 16h00', shift: 'Après-midi', available: true },
        { value: '16:00', label: '16h00 - 18h00', shift: 'Après-midi', available: true },
        { value: '18:00', label: '18h00 - 20h00', shift: 'Soir', available: true },
        { value: '20:00', label: '20h00 - 22h00', shift: 'Soir', available: true }
      ];
      
      // Simuler des créneaux indisponibles (20% de chance)
      return baseSlots.map(slot => ({
        ...slot,
        available: Math.random() > 0.2
      }));
    } catch (err) {
      setError('Erreur lors de la récupération des créneaux');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Créer une réservation - VERSION CONNECTÉE AU BACKEND
  const createBooking = useCallback(async (
    bookingData: Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<{ success: boolean; bookingId?: string; error?: string }> => {
    setLoading(true);
    setError(null);
    
    try {
      // VERSION API RÉELLE
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la création de la réservation');
      }
      
      const data = await response.json();
      return { 
        success: true, 
        bookingId: data.bookingId 
      };
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Envoyer un email de confirmation
  const sendConfirmationEmail = useCallback(async (
    bookingId: string,
    email: string
  ): Promise<boolean> => {
    try {
      // Simuler l'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`Email de confirmation envoyé à ${email} pour la réservation ${bookingId}`);
      return true;
    } catch (err) {
      console.error('Erreur lors de l\'envoi de l\'email:', err);
      return false;
    }
  }, []);

  // Générer un PDF de devis
  const generateQuotePDF = useCallback(async (
    bookingData: Partial<Booking>
  ): Promise<Blob | null> => {
    try {
      // Simuler la génération de PDF
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Créer un blob factice (en production, utilisez une vraie lib PDF)
      const pdfContent = `
        DEVIS - SB Nettoyage
        Date: ${new Date().toLocaleDateString('fr-FR')}
        
        Client: ${bookingData.companyName}
        Contact: ${bookingData.contactName}
        
        Service: ${bookingData.serviceType}
        Surface: ${bookingData.surface} m²
        Fréquence: ${bookingData.frequency}
        
        Prix estimé: ${bookingData.estimatedPrice}€
      `;
      
      return new Blob([pdfContent], { type: 'application/pdf' });
    } catch (err) {
      console.error('Erreur lors de la génération du PDF:', err);
      return null;
    }
  }, []);

  // Valider un code promo
  const validatePromoCode = useCallback(async (
    code: string
  ): Promise<{ valid: boolean; discount?: number; message?: string }> => {
    setLoading(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Codes promo de démonstration
      const promoCodes: Record<string, number> = {
        'NOUVEAU10': 10,
        'FIDELE15': 15,
        'PARTENAIRE20': 20
      };
      
      if (promoCodes[code.toUpperCase()]) {
        return {
          valid: true,
          discount: promoCodes[code.toUpperCase()],
          message: `Code promo appliqué : -${promoCodes[code.toUpperCase()]}%`
        };
      } else {
        return {
          valid: false,
          message: 'Code promo invalide'
        };
      }
    } catch (err) {
      return {
        valid: false,
        message: 'Erreur lors de la validation du code'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    calculatePrice,
    checkAvailability,
    getAvailableSlots,
    createBooking,
    sendConfirmationEmail,
    generateQuotePDF,
    validatePromoCode
  };
};

// Hook pour gérer l'historique des réservations
export const useBookingHistory = (customerId?: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!customerId) return;

    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Simuler un appel API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Données de démonstration
        const mockBookings: Booking[] = [
          {
            id: 'BK-001',
            serviceType: 'bureau',
            surface: 200,
            frequency: 'hebdomadaire',
            date: new Date('2024-03-15'),
            timeSlot: '08:00',
            companyName: 'Tech Corp',
            contactName: 'Marie Dupont',
            email: 'marie@techcorp.com',
            phone: '0612345678',
            status: 'completed',
            estimatedPrice: 320,
            createdAt: new Date('2024-03-01'),
            updatedAt: new Date('2024-03-01')
          },
          // Ajouter plus de réservations fictives si nécessaire
        ];
        
        setBookings(mockBookings);
      } catch (err) {
        setError('Erreur lors du chargement des réservations');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customerId]);

  return { bookings, loading, error };
};