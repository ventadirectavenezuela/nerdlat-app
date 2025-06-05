// backend/app.js
const express = require('express');
const cors = require('cors'); // Importar cors
const app = express();
const PORT = process.env.PORT || 3000;

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes'); // Importar rutas de productos

// Importar middleware de manejo de errores
const errorHandler = require('./middleware/errorHandler');

// Middleware para CORS (permitir peticiones desde el frontend)
app.use(cors());

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Montar rutas de productos

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware global de manejo de errores (debe ser el último middleware)
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

/*
Notas Importantes:

1. Instalar `cors` en el backend: En la carpeta `backend/`, ejecuta `npm install cors`.
2. Reiniciar el backend: Después de añadir los nuevos archivos y modificar `app.js`, asegúrate de reiniciar tu servidor backend (`npm run dev`).
3. `initialProducts` en `mock/products.js`: Este archivo ya no será la fuente principal de productos para el `AdminDashboard`. Los productos se cargarán y gestionarán directamente desde el backend. He añadido un comentario en `mock/products.js` para aclararlo.

¡Ahora puedes probar la gestión de productos desde el `AdminDashboard`!
*/
