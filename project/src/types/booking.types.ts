// Types pour le système de réservation
export interface Booking {
  id: string;
  serviceType: 'bureau' | 'commerce' | 'industriel';
  surface: number;
  frequency: 'unique' | 'hebdomadaire' | 'bihebdomadaire' | 'mensuel';
  additionalServices?: string[];
  date: Date;
  timeSlot: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  specialInstructions?: string;
  accessCode?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  estimatedPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon: string;
}

export interface AdditionalService {
  id: string;
  label: string;
  price: number;
  icon?: string;
}

export interface TimeSlot {
  value: string;
  label: string;
  shift: 'Matin' | 'Après-midi' | 'Soir';
  available: boolean;
}

export interface Quote {
  id: string;
  bookingId: string;
  basePrice: number;
  additionalServicesPrice: number;
  discount: number;
  totalPrice: number;
  validUntil: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Customer {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  address?: string;
  bookings: Booking[];
  createdAt: Date;
}