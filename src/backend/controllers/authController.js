const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo de usuario

// authController.js: Lógica de registro y login de usuarios.

// Registro de usuario
exports.register = async (req, res) => {
    try {
        // CAMBIO AQUÍ: Desestructurar 'name', 'email', 'password' y 'document'
        // 'name' del frontend se usará para 'username' en el backend
        const { name, email, password, document } = req.body;

        // Verificar si el email ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El email ya está registrado.' });
        }

        // Crear nuevo usuario. La contraseña será hasheada automáticamente por el hook pre('save') en el modelo User.
        const user = new User({
            username: name, // Usar 'name' del frontend como 'username' del backend
            email,
            password, // Pasa la contraseña en texto plano, el hook pre('save') la hasheará
            document, // Incluir el campo 'document' si existe en tu modelo User
        });

        await user.save(); // Guarda el usuario, disparando el hook pre('save')

        // Incluir algunos datos del usuario en la respuesta para el frontend
        res.status(201).json({ 
            message: 'Usuario registrado exitosamente.', 
            user: { 
                id: user._id, 
                username: user.username, 
                email: user.email,
                // Puedes añadir el documento aquí si lo quieres en la respuesta:
                // document: user.document 
            } 
        });
    } catch (error) {
        console.error('Error durante el registro:', error); // Log del error completo para depuración
        if (error.code === 11000) { // Código de error de duplicado de MongoDB
            return res.status(400).json({ message: 'El usuario o email ya existe. Intenta con otro.' });
        }
        res.status(500).json({ message: 'Error en el registro del usuario.', details: error.message });
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