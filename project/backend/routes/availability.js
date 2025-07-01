const express = require('express');
const router = express.Router();

// GET /api/availability/:date - Obtenir les créneaux disponibles
router.get('/:date', async (req, res) => {
  try {
    const { date } = req.params;
    
    // Créneaux de base
    const baseSlots = [
      { value: '06:00', label: '6h00 - 8h00', shift: 'Matin', available: true },
      { value: '08:00', label: '8h00 - 10h00', shift: 'Matin', available: true },
      { value: '10:00', label: '10h00 - 12h00', shift: 'Matin', available: true },
      { value: '14:00', label: '14h00 - 16h00', shift: 'Après-midi', available: true },
      { value: '16:00', label: '16h00 - 18h00', shift: 'Après-midi', available: true },
      { value: '18:00', label: '18h00 - 20h00', shift: 'Soir', available: true },
      { value: '20:00', label: '20h00 - 22h00', shift: 'Soir', available: true }
    ];
    
    // Simuler des créneaux occupés (20% de chance)
    const slots = baseSlots.map(slot => ({
      ...slot,
      available: Math.random() > 0.2
    }));
    
    res.json({
      success: true,
      date,
      slots
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des créneaux'
    });
  }
});

// GET /api/availability/:date/:timeSlot - Vérifier un créneau spécifique
router.get('/:date/:timeSlot', async (req, res) => {
  try {
    const { date, timeSlot } = req.params;
    
    // Simuler la disponibilité (80% de chance d'être disponible)
    const available = Math.random() > 0.2;
    
    res.json({
      success: true,
      date,
      timeSlot,
      available
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification'
    });
  }
});

module.exports = router;