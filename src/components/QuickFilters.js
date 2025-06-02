import React from 'react';

const QuickFilters = ({ onFilterChange, products }) => {
  const filters = [
    { label: 'Ofertas del día', value: 'ofertas' },
    { label: 'Más vendidos', value: 'mas_vendidos' },
    { label: 'Novedades', value: 'novedades' },
    { label: 'Envío gratis', value: 'envio_gratis' },
    { label: 'Marcas destacadas', value: 'marcas_destacadas' },
  ];

  // Obtener categorías únicas de los productos
  const categories = [...new Set(products.map(p => p.category))].sort();

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors text-sm whitespace-nowrap"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onFilterChange('category', category)}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors text-sm whitespace-nowrap"
          >
            {category}
          </button>
        ))}
        {categories.length > 0 && (
          <button
            onClick={() => onFilterChange('all')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors text-sm whitespace-nowrap"
          >
            Todas las categorías
          </button>
        )}
      </div>
    </div>
  );
};

export default QuickFilters;