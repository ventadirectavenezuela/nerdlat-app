// userController.js: Lógica para obtener, actualizar y eliminar el perfil del usuario.
const User = require('../models/User'); // Asegúrate que sea 'User' con 'U' mayúscula, según tu modelo

// Obtener perfil de usuario
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error); // Para ver el error completo en la consola del servidor
        res.status(500).json({ message: 'Error del servidor al obtener el perfil' });
    }
};

// Actualizar perfil de usuario
exports.updateUserProfile = async (req, res) => {
    try {
        const updates = req.body;
        // Opcional: Filtrar qué campos se pueden actualizar
        // const { username, email } = req.body;
        // const updates = { username, email }; // Solo permite actualizar username y email

        const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        console.error(error); // Para ver el error completo
        if (error.code === 11000) { // Error de clave duplicada (ej. email ya existe)
            return res.status(400).json({ message: 'El email ya está en uso por otro usuario.' });
        }
        res.status(500).json({ message: 'Error al actualizar el perfil' });
    }
};

// Eliminar perfil de usuario
exports.deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Perfil eliminado correctamente' });
    } catch (error) {
        console.error(error); // Para ver el error completo
        res.status(500).json({ message: 'Error al eliminar el perfil' });
    }
};