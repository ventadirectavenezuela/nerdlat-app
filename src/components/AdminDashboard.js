import React, { useState, useEffect } from 'react';
import AdminProductForm from './AdminProductForm';
import ProductGrid from './ProductGrid';
import AdminProfile from './AdminProfile';
import AdminStats from './AdminStats';

const AdminDashboard = ({ 
  admin,
  onUpdateAdmin,
  onLogout 
}) => {
  const [products, setProducts] = useState([]); // Ahora los productos se gestionan desde aquí
  const [isEditing, setIsEditing] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [errorProducts, setErrorProducts] = useState('');

  // Efecto para cargar los productos desde el backend al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setErrorProducts('');
      try {
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          setErrorProducts(data.message || 'Error al cargar productos.');
        }
      } catch (err) {
        setErrorProducts('No se pudo conectar con el servidor para cargar productos.');
        console.error('Error de conexión:', err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${Auth.getToken()}` // En un entorno real, enviar token de autenticación
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(prev => [...prev, data.product]); // Añadir el producto devuelto por el backend
        alert('Producto agregado exitosamente!');
      } else {
        alert(`Error al agregar producto: ${data.message || 'Desconocido'}`);
      }
    } catch (err) {
      alert('Error de conexión al agregar producto.');
      console.error('Error de conexión:', err);
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${updatedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? data.product : p)); // Actualizar el producto
        alert('Producto actualizado exitosamente!');
      } else {
        alert(`Error al actualizar producto: ${data.message || 'Desconocido'}`);
      }
    } catch (err) {
      alert('Error de conexión al actualizar producto.');
      console.error('Error de conexión:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${Auth.getToken()}`
        },
      });
      if (response.ok) {
        setProducts(prev => prev.filter(p => p.id !== productId)); // Eliminar de la lista
        alert('Producto eliminado exitosamente!');
      } else {
        const data = await response.json();
        alert(`Error al eliminar producto: ${data.message || 'Desconocido'}`);
      }
    } catch (err) {
      alert('Error de conexión al eliminar producto.');
      console.error('Error de conexión:', err);
    }
  };

  const handleEdit = (product) => {
    setIsEditing(product);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  const handleSubmitEdit = (updatedProduct) => {
    handleUpdateProduct(updatedProduct);
    setIsEditing(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="md:w-1/4">
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-base sm:text-lg font-bold mb-2">Menú de Administración</h2>
            <ul className="py-2 sm:py-4 space-y-1 sm:space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full text-left p-2 rounded text-sm ${activeTab === 'products' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  Gestión de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full text-left p-2 rounded text-sm ${activeTab === 'stats' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  Estadísticas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left p-2 rounded text-sm ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  Perfil de Admin
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="md:w-3/4">
          {activeTab === 'products' && (
            <>
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Gestión de Productos</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                    {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                  </h2>
                  <AdminProductForm
                    product={isEditing}
                    onSubmit={isEditing ? handleSubmitEdit : handleAddProduct} // Usar handleAddProduct
                    onCancel={isEditing ? handleCancelEdit : null}
                  />
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Lista de Productos</h2>
                  {loadingProducts ? (
                    <p className="text-gray-600">Cargando productos...</p>
                  ) : errorProducts ? (
                    <p className="text-red-500">{errorProducts}</p>
                  ) : products.length === 0 ? (
                    <p className="text-gray-600">No hay productos. ¡Agrega el primero!</p>
                  ) : (
                    <ProductGrid
                      products={products}
                      showActions
                      onEdit={handleEdit}
                      onDelete={handleDeleteProduct} // Usar handleDeleteProduct
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'stats' && (
            <AdminStats products={products} />
          )}

          {activeTab === 'profile' && (
            <AdminProfile 
              admin={admin} 
              onUpdate={onUpdateAdmin}
              onLogout={onLogout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;