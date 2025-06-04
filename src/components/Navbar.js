import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-xl">Nerdlat</div>

        {/* Botón de menú hamburguesa para móviles */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              {isOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 0 0-1.414l-4.864-4.864a1 1 0 0 0-1.414 0l-4.864 4.864a1 1 0 0 0 1.414 1.414l4.864-4.864a1 1 0 0 0 1.414 0z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú horizontal para escritorio */}
        <div className="hidden md:flex space-x-4">
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productos</a>
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contacto</a>
          <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
        </div>
      </div>

      {/* Menú desplegable para móviles */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Inicio</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Productos</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Contacto</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// DONE