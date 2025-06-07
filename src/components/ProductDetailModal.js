import React, { useState } from 'react';
import { StarIcon } from './Icons';

const ProductDetailModal = ({ product, onClose, onAddToCart, onToggleFavorite, isFavorite }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // Simulación de comentarios

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments(prev => [...prev, { text: comment, user: 'Usuario Anónimo', date: new Date().toLocaleDateString() }]);
      setComment('');
    }
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto relative flex flex-col">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-6 flex-grow">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center bg-gray-100 rounded-lg p-4">
              <img src={product.image} alt={product.name} className="max-h-64 object-contain" />
            </div>
            <div className="flex-grow md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C3E50] mb-2">{product.name}</h2>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} filled={i < product.rating} />
                ))}
                <span className="text-gray-500 text-sm ml-2">({product.rating} estrellas)</span>
              </div>
              <p className="text-gray-700 text-base mb-4">{product.description}</p>
              <p className="text-[#E74C3C] font-bold text-2xl mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-600 text-sm mb-4">Stock disponible: {product.stock}</p>

              <div className="flex flex-wrap gap-3 mt-auto">
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-[#3498DB] text-white px-4 py-2 rounded-lg hover:bg-[#2980B9] transition-colors flex-grow sm:flex-grow-0"
                >
                  Agregar al carrito
                </button>
                <button 
                  onClick={() => onToggleFavorite(product)}
                  className={`px-4 py-2 rounded-lg transition-colors flex-grow sm:flex-grow-0 ${isFavorite ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <svg className="w-5 h-5 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {isFavorite ? 'Favorito' : 'Añadir a favoritos'}
                </button>
              </div>

              <div className="mt-6 border-t pt-4">
                <h3 className="text-lg font-bold mb-2">Información de Envío y Devoluciones</h3>
                <p className="text-gray-600 text-sm">
                  Envío disponible a todo el país. Tiempo de entrega estimado: 3-5 días hábiles.
                  Devoluciones aceptadas dentro de los 15 días posteriores a la compra, sujeto a condiciones.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de Reseñas y Comentarios */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-bold mb-4">Reseñas y Comentarios</h3>
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">Sé el primero en dejar un comentario.</p>
              ) : (
                comments.map((c, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                    <p className="font-semibold text-gray-800">{c.user} <span className="text-gray-500 text-xs ml-2">{c.date}</span></p>
                    <p className="text-gray-700 mt-1">{c.text}</p>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Deja tu comentario:</h4>
              <textarea
                className="w-full p-2 border rounded-lg resize-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Escribe tu comentario aquí..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                onClick={handleAddComment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Enviar Comentario
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;