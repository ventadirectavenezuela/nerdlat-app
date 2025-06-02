import React, { useState } from 'react';
import { StarIcon } from './Icons';

const ProductCard = ({ product, onAddToCart, showDelete, onDelete, onToggleFavorite, favorites = [] }) => {
  const [localMessage, setLocalMessage] = useState('');
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = () => {
    setLocalMessage('Agregando al carrito...');
    onAddToCart(product);
    setTimeout(() => setLocalMessage(''), 2000);
  };

  const handleDelete = () => {
    setLocalMessage('Eliminando producto...');
    onDelete(product.id);
    setTimeout(() => setLocalMessage(''), 2000);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite(product);
    setLocalMessage(isFavorite ? 'Eliminado de favoritos' : 'Agregado a favoritos');
    setTimeout(() => setLocalMessage(''), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col border border-gray-200">
      <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
        <img 
          src={product.image || 'https://via.placeholder.com/300'} 
          alt={product.name}
          className="h-full object-contain"
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold text-[#2C3E50] mb-1">{product.name}</h3>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} filled={i < product.rating} />
          ))}
          <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        {localMessage && (
          <p className="text-blue-500 text-xs mb-2">{localMessage}</p>
        )}
        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <span className="text-[#E74C3C] font-bold text-lg">${product.price.toFixed(2)}</span>
            {showDelete ? (
              <button 
                onClick={handleDelete}
                className="bg-[#E74C3C] text-white px-3 py-1 rounded text-sm hover:bg-[#C0392B] transition-colors"
              >
                Eliminar
              </button>
            ) : (
              <div className="flex items-center space-x-2"> {/* Contenedor para botón y corazón */}
                {onToggleFavorite && (
                  <button 
                    onClick={handleToggleFavorite}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'} hover:scale-110 transition-transform`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <button 
                  onClick={handleAddToCart}
                  className="bg-[#3498DB] text-white px-3 py-1 rounded text-sm hover:bg-[#2980B9] transition-colors"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// DONE