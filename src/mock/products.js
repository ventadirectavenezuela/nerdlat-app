// mock/products.js
// Este archivo ya no será la fuente principal de productos,
// sino que los productos se cargarán desde el backend.
// Lo mantengo para que el código compile si hay alguna referencia inicial,
// pero su contenido será ignorado una vez que el backend esté conectado.

const initialProducts = [
  {
    id: 1,
    name: "Smartphone Premium",
    description: "Último modelo con cámara de 108MP y pantalla AMOLED",
    price: 899.99,
    image: "https://via.placeholder.com/300",
    category: "Electrónica",
    rating: 4,
    stock: 15
  },
  {
    id: 2,
    name: "Laptop Ultradelgada",
    description: "16GB RAM, 512GB SSD, pantalla 4K",
    price: 1299.99,
    image: "https://via.placeholder.com/300",
    category: "Electrónica",
    rating: 5,
    stock: 10
  },
  {
    id: 3,
    name: "Auriculares Inalámbricos",
    description: "Cancelación de ruido activa, 30h de batería",
    price: 199.99,
    image: "https://via.placeholder.com/300",
    category: "Audio",
    rating: 4,
    stock: 25
  },
  {
    id: 4,
    name: "Smart Watch Pro",
    description: "Monitoreo de salud, GPS, resistente al agua",
    price: 249.99,
    image: "https://via.placeholder.com/300",
    category: "Wearables",
    rating: 3,
    stock: 20
  },
  {
    id: 5,
    name: "Tablet 10\"",
    description: "Pantalla Full HD, 128GB almacenamiento",
    price: 349.99,
    image: "https://via.placeholder.com/300",
    category: "Electrónica",
    rating: 4,
    stock: 18
  },
  {
    id: 6,
    name: "Cámara DSLR Profesional",
    description: "24.2MP, grabación 4K, lentes intercambiables",
    price: 799.99,
    image: "https://via.placeholder.com/300",
    category: "Fotografía",
    rating: 5,
    stock: 7
  },
  {
    id: 7,
    name: "Teclado Mecánico RGB",
    description: "Switches Cherry MX, retroiluminación personalizable",
    price: 120.00,
    image: "https://via.placeholder.com/300",
    category: "Accesorios PC",
    rating: 4,
    stock: 30
  },
  {
    id: 8,
    name: "Mouse Gamer Inalámbrico",
    description: "Sensor óptico de alta precisión, 10 botones programables",
    price: 75.00,
    image: "https://via.placeholder.com/300",
    category: "Accesorios PC",
    rating: 4,
    stock: 40
  },
  {
    id: 9,
    name: "Monitor Curvo 27\"",
    description: "Resolución QHD, 144Hz, FreeSync",
    price: 450.00,
    image: "https://via.placeholder.com/300",
    category: "Monitores",
    rating: 4,
    stock: 12
  },
  {
    id: 10,
    name: "Impresora Multifuncional",
    description: "Imprime, escanea y copia, Wi-Fi integrado",
    price: 180.00,
    image: "https://via.placeholder.com/300",
    category: "Oficina",
    rating: 3,
    stock: 22
  }
];

export default initialProducts;