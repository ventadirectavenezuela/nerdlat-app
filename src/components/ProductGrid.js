import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ products = [], onAddToCart, showDelete, onDelete, onToggleFavorite, favorites = [], onProductClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0">
      {products.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
          showDelete={showDelete}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite} 
          favorites={favorites} 
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

// DONE