import React from 'react';
import CategoryMenu from './CategoryMenu';

const SecondaryNavbar = ({ onSelectCategory }) => {
  // Obtener categorías de productos (simuladas o de un mock)
  const productCategories = ['Electrónica', 'Audio', 'Wearables', 'Fotografía', 'Accesorios PC', 'Monitores', 'Oficina'];

  return (
    <nav className="bg-gray-200 py-2 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start">
        <CategoryMenu categories={productCategories} onSelectCategory={onSelectCategory} />
        {/* Aquí podrías añadir otros enlaces o elementos si fueran necesarios en esta barra secundaria */}
      </div>
    </nav>
  );
};

export default SecondaryNavbar;