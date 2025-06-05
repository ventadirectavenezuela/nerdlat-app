const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Ruta userRoutes funcionando' });
});

module.exports = router;
