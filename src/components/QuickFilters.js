import React from 'react';

const QuickFilters = ({ onFilterChange, products }) => {
  // Eliminados los filtros rápidos como "Ofertas del día", "Más vendidos", etc.
  // Solo se mantienen los filtros por categoría.

  // Obtener categorías únicas de los productos
  const categories = [...new Set(products.map(p => p.category))].sort();

  return (
    <div className="mb-8 px-4 sm:px-0">
      {/* Eliminado el div que contenía los botones de filtro rápido */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onFilterChange('category', category)}
            className="bg-blue-100 text-blue-800 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-blue-200 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            {category}
          </button>
        ))}
        {categories.length > 0 && (
          <button
            onClick={() => onFilterChange('all')}
            className="bg-gray-100 text-gray-700 px-3 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-gray-200 transition-colors text-xs sm:text-sm whitespace-nowrap"
          >
            Todas las categorías
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickFilters;