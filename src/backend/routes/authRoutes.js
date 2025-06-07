const express = require('express');
const { register, login } = require('../controllers/authController'); // <-- ESTO DEBE ESTAR ASÍ

// authRoutes.js: Rutas para el registro y login de usuarios.

const router = express.Router();

// Ruta para registro de usuario
router.post('/register', register); // <-- Y USAMOS 'register' AQUÍ

// Ruta para login de usuario
router.post('/login', login);     // <-- Y USAMOS 'login' AQUÍ

module.exports = router;