// Este componente ya no se usa directamente en LayoutHeader,
// Su funcionalidad de menú principal se integra directamente en el UserSidebar.
// Se mantiene el archivo por si se necesita en otro contexto, pero no se renderiza.

import React, { useState } => 'react';

const CategoryMenu = ({ categories, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setIsOpen(false); // Cerrar menú al seleccionar
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón de Menú Hamburguesa */}
      <button
        onClick={toggleMenu}
        className="bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        aria-label="Abrir menú de categorías"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          {/* Overlay para cerrar el menú al hacer clic fuera */}
          <div className="fixed inset-0 bg-black bg-opacity-25 z-20" onClick={toggleMenu}></div>
          
          {/* Contenedor del Menú */}
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-30 overflow-hidden
                        sm:w-auto sm:min-w-[200px] sm:max-w-xs">
            <div className="py-2">
              <h3 className="px-4 py-2 text-gray-500 font-semibold text-sm uppercase">Categorías</h3>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  {category}
                </button>
              ))}
              <button
                onClick={() => handleCategoryClick('all')}
                className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-blue-50"
              >
                Todas las categorías
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryMenu;

// DONE