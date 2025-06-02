import React, { useState } from 'react';
import AdminProductForm from './AdminProductForm';
import ProductGrid from './ProductGrid';
import AdminProfile from './AdminProfile';
import AdminStats from './AdminStats';

const AdminDashboard = ({ 
  products, 
  admin,
  onAddProduct, 
  onUpdateProduct, 
  onDeleteProduct,
  onUpdateAdmin,
  onLogout 
}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  const handleEdit = (product) => {
    setIsEditing(product);
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
  };

  const handleSubmitEdit = (updatedProduct) => {
    onUpdateProduct(updatedProduct);
    setIsEditing(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-bold mb-2">Menú de Administración</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full text-left p-2 rounded ${activeTab === 'products' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  Gestión de Productos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`w-full text-left p-2 rounded ${activeTab === 'stats' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
                >
                  Estadísticas
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left p-2 rounded ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Gestión de Productos</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">
                    {isEditing ? 'Editar Producto' : 'Agregar Producto'}
                  </h2>
                  <AdminProductForm
                    product={isEditing}
                    onSubmit={isEditing ? handleSubmitEdit : onAddProduct}
                    onCancel={isEditing ? handleCancelEdit : null}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Lista de Productos</h2>
                  <ProductGrid
                    products={products}
                    showActions
                    onEdit={handleEdit}
                    onDelete={onDeleteProduct}
                  />
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