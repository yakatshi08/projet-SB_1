const express = require('express');
const router = express.Router();

// POST /api/quotes - Générer un devis
router.post('/', async (req, res) => {
  try {
    const quoteData = req.body;
    
    const quote = {
      id: `QUOTE-${Date.now()}`,
      ...quoteData,
      createdAt: new Date(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 jours
    };
    
    res.json({
      success: true,
      quote
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération du devis'
    });
  }
});

// POST /api/quotes/generate-pdf - Générer PDF
router.post('/generate-pdf', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Ici, utiliser une librairie comme PDFKit ou Puppeteer
    // Pour l'instant, on simule
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
    
    // Envoyer le PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=devis.pdf');
    res.send(Buffer.from(pdfContent));
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la génération du PDF'
    });
  }
});

module.exports = router;