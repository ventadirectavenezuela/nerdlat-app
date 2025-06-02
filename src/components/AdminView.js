import React from 'react';
import AdminProductForm from './AdminProductForm';
import ProductGrid from './ProductGrid';

const AdminView = ({ onAddProduct, onDeleteProduct }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Panel de Administración</h1>
      <AdminProductForm onAddProduct={onAddProduct} />
      
      <h2 className="text-xl font-bold mb-4">Productos Actuales</h2>
      <ProductGrid 
        showDelete
        onDelete={onDeleteProduct}
      />
    </div>
  );
};

export default AdminView;