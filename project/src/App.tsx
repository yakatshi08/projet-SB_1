import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des pages
import Home from './pages/Home';
import Services from './pages/Services';
import BookingPage from './pages/BookingPage';
import Login from './pages/Login';
import Contact from './pages/Contact'; // ✅ Bon import

// Import des composants Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} /> {/* ✅ Route ajoutée */}
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
