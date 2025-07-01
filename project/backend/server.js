const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes - IMPORTANT: Définir les routes directement pour l'instant
app.use('/api/bookings', require('./routes/bookings'));

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API SB Nettoyage fonctionnelle!' });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});