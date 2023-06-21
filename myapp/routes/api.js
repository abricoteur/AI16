// ./routes/api.js
const express = require('express');
const router = express.Router();
const pool = require('../model/db');  // Assurez-vous que ce chemin est correct

router.get('/data', (req, res) => {
  pool.query('SELECT * FROM Offres', (err, rows) => {
    if (err) {
      console.error('Erreur lors de la récupération des données: ', err);
      res.status(500).json({ error: err });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;

