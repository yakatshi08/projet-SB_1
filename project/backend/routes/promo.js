const express = require('express');
const router = express.Router();

// Codes promo valides
const promoCodes = {
  'NOUVEAU10': { discount: 10, description: 'Nouveau client' },
  'FIDELE15': { discount: 15, description: 'Client fidèle' },
  'PARTENAIRE20': { discount: 20, description: 'Partenaire' }
};

// POST /api/promo/validate - Valider un code promo
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    
    const promo = promoCodes[code?.toUpperCase()];
    
    if (promo) {
      res.json({
        valid: true,
        discount: promo.discount,
        message: `Code promo appliqué : -${promo.discount}%`
      });
    } else {
      res.json({
        valid: false,
        message: 'Code promo invalide'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      valid: false,
      message: 'Erreur lors de la validation du code'
    });
  }
});

module.exports = router;