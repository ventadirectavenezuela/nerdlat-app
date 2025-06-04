import React from 'react';
import { CartIcon } from './Icons';

const LayoutHeader = ({ isAdmin, currentUser, onLoginClick, onRegisterClick, onLogout, onGoHome }) => { // onGoHome es para el botón Home
  return (
    <header className="bg-[#2C3E50] text-white p-0 shadow-md sticky top-0 z-40 h-auto min-h-[100px] flex items-center justify-center overflow-hidden">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between h-full px-4 sm:px-6 lg:px-8 max-w-full md:max-w-5xl py-2">
        {/* Contenedor del Logo (ahora también es el botón Home) */}
        <div className="flex flex-col items-center flex-shrink-0 mb-2 sm:mb-0 cursor-pointer" onClick={onGoHome}>
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0iaACeOU3SvywDhA4KtNVcgeG7fQn92ZEUMjC" 
            alt="Logo Venta Directa"
            className="h-48 w-48 sm:h-24 sm:w-24 object-contain" 
          />
        </div>
        
        {/* Botones de Inicio de Sesión y Registro o Saludo al Usuario */}
        {!isAdmin && (
          <div className="hidden sm:flex items-center space-x-2 sm:space-x-4 flex-wrap justify-center sm:justify-end">
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