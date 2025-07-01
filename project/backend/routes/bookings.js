const express = require('express');
const router = express.Router();

// Base de données temporaire (en mémoire)
let bookings = [];

// POST /api/bookings - Créer une réservation
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // LOG POUR VOIR LES DONNÉES REÇUES
    console.log('Nouvelle réservation reçue:', bookingData);
    
    // Générer un ID unique
    const bookingId = `BK-${Date.now()}`;
    
    // Créer la réservation
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Sauvegarder en mémoire
    bookings.push(newBooking);
    
    // Répondre avec succès
    res.status(201).json({
      success: true,
      bookingId: bookingId,
      booking: newBooking
    });
    
  } catch (error) {
    console.error('Erreur création réservation:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création de la réservation'
    });
  }
});

// GET /api/bookings - Lister toutes les réservations
router.get('/', async (req, res) => {
  res.json({
    success: true,
    bookings: bookings
  });
});

module.exports = router;