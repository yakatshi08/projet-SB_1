import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des pages
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
// import ServicesPage from './pages/ServicesPage';
// import ContactPage from './pages/ContactPage';

// Import des composants globaux
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <Header /> */}
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/reservation" element={<BookingPage />} />
            {/* <Route path="/services" element={<ServicesPage />} /> */}
            {/* <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </main>
        
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;