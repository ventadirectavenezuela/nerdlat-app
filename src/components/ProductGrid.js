import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], onAddToCart, showDelete, onDelete, onToggleFavorite, favorites = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          showDelete={showDelete}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite} // Pasar la función a ProductCard
          favorites={favorites} // Pasar la lista de favoritos a ProductCard
        />
      ))}
    </div>
  );
};

export default ProductGrid;

// DONE