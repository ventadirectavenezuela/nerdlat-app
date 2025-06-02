import React, { useState } from 'react';
import AdminProductForm from './AdminProductForm';
import ProductGrid from './ProductGrid';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);

  const handleAddProduct = (newProduct) => {
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AdminProductForm onAddProduct={handleAddProduct} />
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Productos Actuales</h1>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;