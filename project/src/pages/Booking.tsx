import React from 'react';
import BookingForm from '../components/BookingForm';

const Booking: React.FC = () => {
  return (
    <div className="bg-warm-gray min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BookingForm />
      </div>
    </div>
  );
};

export default Booking;