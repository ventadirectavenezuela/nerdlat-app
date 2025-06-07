require('dotenv').config(); // Cargar variables de entorno al inicio
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Para permitir peticiones desde el frontend
const authRoutes = require('./routes/authRoutes'); // Importar rutas de autenticación
const userRoutes = require('./routes/userRoutes'); // Importar rutas de usuario
const productRoutes = require('./routes/productRoutes'); // Importar tus rutas de productos existentes

const app = express();

// Middleware
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Configuración de CORS para permitir peticiones desde tu frontend
app.use(cors({
    origin: 'http://localhost:3000', // Permite solo peticiones desde tu frontend React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilita el envío de cookies o encabezados de autorización (si los usas)
    optionsSuccessStatus: 204
}));

// Conexión a la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name')
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas de la API
// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de usuario (protegidas)
app.use('/api/users', userRoutes);

// Tus rutas de productos existentes
app.use('/api/products', productRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API está funcionando...');
});

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));