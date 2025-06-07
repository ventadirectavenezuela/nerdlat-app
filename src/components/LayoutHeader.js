import React from 'react';
import { CartIcon } from './Icons';
// CategoryMenu ya no se importa aquí, ya que el menú principal es el UserSidebar

const LayoutHeader = ({ isAdmin, currentUser, onLoginClick, onRegisterClick, onLogout, onGoHome, onOpenSidebar }) => { // onOpenSidebar es la función para abrir el sidebar
  return (
    <header className="bg-[#2C3E50] text-white p-0 shadow-md sticky top-0 z-40 h-auto min-h-[100px] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-full md:max-w-5xl py-2">
        {/* Grupo Izquierdo: Botón de Menú Principal (Hamburguesa) y Logo */}
        <div className="flex items-center flex-grow">
          <button
            onClick={onOpenSidebar} // Conectado al handler para abrir el sidebar
            className="text-white mr-2 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-md"
            aria-label="Abrir menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Contenedor del Logo */}
          <div className="flex flex-col items-center cursor-pointer" onClick={onGoHome}>
            <img 
              src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0iaACeOU3SvywDhA4KtNVcgeG7fQn92ZEUMjC" 
              alt="Logo Venta Directa"
              className="h-48 w-48 sm:h-24 sm:w-24 object-contain" 
            />
          </div>
        </div>
        
        {/* Grupo Derecho: Botones de Autenticación */}
        {!isAdmin && (
          <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-end">
            {!currentUser ? (
              <>
                <button 
                  onClick={onLoginClick}
                  className="bg-[#FF6F00] text-white px-3 py-2 rounded hover:bg-[#E76400] text-sm whitespace-nowrap" 
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="bg-[#3498DB] text-white px-3 py-2 rounded hover:bg-[#2980B9] text-sm whitespace-nowrap" 
                >
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm whitespace-nowrap hidden sm:block">Hola, {currentUser.nombre}!</span>
                <button 
                  onClick={onLogout}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm whitespace-nowrap"
                >
                  Salir
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;