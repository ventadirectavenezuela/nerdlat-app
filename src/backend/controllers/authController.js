const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo de usuario

// authController.js: Lógica de registro y login de usuarios.

// Registro de usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe por email (el username no es único en el esquema actual)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        // Crear nuevo usuario. La contraseña será hasheada automáticamente por el hook pre('save') en el modelo User.
        const user = new User({
            username,
            email,
            password, // Pasa la contraseña en texto plano, el hook pre('save') la hasheará
        });

        await user.save(); // Guarda el usuario, disparando el hook pre('save')

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        // Manejo de errores detallado
        if (error.code === 11000) { // Código de error de duplicado de MongoDB
            return res.status(400).json({ message: 'El usuario o email ya existe. Intenta con otro.' });
        }
        res.status(500).json({ message: 'Error en el registro del usuario.', error: error.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas (email o contraseña incorrectos).' });
        }

        // Comparar contraseñas usando el método del modelo
        const isMatch = await user.comparePassword(password); // Usa el método comparePassword del modelo
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas (email o contraseña incorrectos).' });
        }

        // Generar token JWT usando el método del modelo
        const token = user.generateJWT(); // Usa el método generateJWT del modelo

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login del usuario.', error: error.message });
    }
};