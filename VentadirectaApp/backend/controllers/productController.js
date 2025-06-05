// backend/controllers/productController.js
// Simulación de una base de datos de productos en memoria
let products = []; // Usamos 'let' para poder reasignar si eliminamos todos

// Función auxiliar para generar un ID único simple
const generateProductId = () => {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

// Obtener todos los productos
const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

// Obtener un producto por ID
const getProductById = (req, res, next) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    const error = new Error('Producto no encontrado.');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json(product);
};

// Crear un nuevo producto
const createProduct = (req, res, next) => {
  const { name, description, price, image, category, stock } = req.body;

  // Validación básica (puedes usar un middleware de validación más robusto)
  if (!name || !description || !price || !image || !category || stock === undefined) {
    const error = new Error('Faltan campos obligatorios para el producto.');
    error.statusCode = 400;
    return next(error);
  }

  const newProduct = {
    id: generateProductId(),
    name,
    description,
    price: parseFloat(price),
    image,
    category,
    stock: parseInt(stock),
    rating: Math.floor(Math.random() * 5) + 1, // Rating aleatorio para simulación
    createdAt: new Date().toISOString()
  };

  products.push(newProduct);
  res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
};

// Actualizar un producto por ID
const updateProduct = (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  const productIndex = products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    const error = new Error('Producto no encontrado.');
    error.statusCode = 404;
    return next(error);
  }

  // Asegurarse de que el ID no se pueda cambiar
  if (updates.id && updates.id !== parseInt(id)) {
    const error = new Error('El ID del producto no puede ser modificado.');
    error.statusCode = 400;
    return next(error);
  }

  // Actualizar el producto
  products[productIndex] = { ...products[productIndex], ...updates, id: parseInt(id) }; // Asegurar que el ID sea el correcto
  res.status(200).json({ message: 'Producto actualizado exitosamente', product: products[productIndex] });
};

// Eliminar un producto por ID
const deleteProduct = (req, res, next) => {
  const { id } = req.params;
  const initialLength = products.length;
  products = products.filter(p => p.id !== parseInt(id));

  if (products.length === initialLength) {
    const error = new Error('Producto no encontrado.');
    error.statusCode = 404;
    return next(error);
  }
  res.status(200).json({ message: 'Producto eliminado exitosamente.' });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

/*
Explicación:
*   `products`: Array en memoria para simular la base de datos de productos.
*   `generateProductId`: Función auxiliar para IDs únicos.
*   `getAllProducts`: Devuelve todos los productos.
*   `getProductById`: Busca un producto por su ID.
*   `createProduct`: Añade un nuevo producto al array.
*   `updateProduct`: Actualiza un producto existente.
*   `deleteProduct`: Elimina un producto.
*   Cada función maneja errores y los pasa al `errorHandler`.
*/
