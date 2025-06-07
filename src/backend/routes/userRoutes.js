const express = require('express');
// Importamos las funciones con sus nombres exactos desde userController
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Obtener información del usuario autenticado
router.get('/me', authMiddleware, getUserProfile); // Usar el nombre exportado: getUserProfile

// Actualizar información del usuario autenticado
router.put('/me', authMiddleware, updateUserProfile); // Usar el nombre exportado: updateUserProfile

// Eliminar cuenta del usuario autenticado
router.delete('/me', authMiddleware, deleteUserProfile); // Usar el nombre exportado: deleteUserProfile

module.exports = router;