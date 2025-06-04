import React from 'react';

const LandingPage = ({ onExploreClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white p-4 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 animate-fade-in-down">
        Venta Directa
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-8 animate-fade-in-up">
        Tu tienda online de confianza. Compras fáciles y seguras.
      </p>
      <button
        onClick={onExploreClick}
        className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 animate-bounce-in"
      >
        Explorar Productos
      </button>
    </div>
  );
};

export default LandingPage;