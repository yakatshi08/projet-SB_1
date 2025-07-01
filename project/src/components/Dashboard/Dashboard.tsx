import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, FileText, MessageSquare, Star, User } from 'lucide-react';

interface Reservation {
  id: string;
  date: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'completed';
  address: string;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending';
  service: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('reservations');

  const mockReservations: Reservation[] = [
    {
      id: '1',
      date: '2024-01-15',
      time: '10:00',
      service: 'Nettoyage à domicile',
      status: 'confirmed',
      address: '123 Rue de la Paix, Paris'
    },
    {
      id: '2',
      date: '2024-01-22',
      time: '14:00',
      service: 'Grand nettoyage',
      status: 'pending',
      address: '456 Avenue des Champs, Lyon'
    }
  ];

  const mockInvoices: Invoice[] = [
    {
      id: 'INV-001',
      date: '2024-01-08',
      amount: 85,
      status: 'paid',
      service: 'Nettoyage à domicile'
    },
    {
      id: 'INV-002',
      date: '2024-01-15',
      amount: 120,
      status: 'pending',
      service: 'Grand nettoyage'
    }
  ];

  const tabs = [
    { id: 'reservations', name: 'Mes réservations', icon: Calendar },
    { id: 'invoices', name: 'Factures', icon: FileText },
    { id: 'messages', name: 'Messages', icon: MessageSquare },
    { id: 'reviews', name: 'Évaluer', icon: Star },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmé';
      case 'pending':
        return 'En attente';
      case 'completed':
        return 'Terminé';
      case 'paid':
        return 'Payé';
      default:
        return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* En-tête */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <User className="h-8 w-8 text-golden-orange" />
          <h1 className="text-3xl font-bold text-forest-green">Tableau de bord</h1>
        </div>
        <p className="text-gray-600">Gérez vos réservations et suivez vos services</p>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-golden-orange text-golden-orange'
                    : 'border-transparent text-gray-500 hover:text-forest-green hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu des onglets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'reservations' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Mes réservations</h2>
            <div className="space-y-4">
              {mockReservations.map((reservation) => (
                <div key={reservation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-forest-green">{reservation.service}</h3>
                      <p className="text-sm text-gray-600 mt-1">{reservation.address}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(reservation.date).toLocaleDateString('fr-FR')} à {reservation.time}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reservation.status)}`}>
                      {getStatusText(reservation.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Factures</h2>
            <div className="space-y-4">
              {mockInvoices.map((invoice) => (
                <div key={invoice.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-forest-green">{invoice.id}</h3>
                      <p className="text-sm text-gray-600 mt-1">{invoice.service}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(invoice.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-forest-green">{invoice.amount}€</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Messages</h2>
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun message pour le moment</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold text-forest-green mb-4">Évaluer nos services</h2>
            <div className="text-center py-8">
              <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Aucun service à évaluer actuellement</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;