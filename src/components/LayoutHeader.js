import React from 'react';
import { CartIcon } from './Icons';

const LayoutHeader = ({ isAdmin, currentUser, onLoginClick, onRegisterClick, onLogout }) => {
  return (
    <header className="bg-[#2C3E50] text-white p-0 shadow-md sticky top-0 z-40 h-40 flex items-center justify-center overflow-hidden"> {/* Cambiado justify-between a justify-center para centrar el contenido */}
      <div className="container mx-auto flex items-center justify-between h-full max-w-5xl"> {/* Añadido max-w-5xl para reducir el ancho del contenedor */}
        <div className="flex items-center space-x-3 h-full">
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc07XI8119ulj9cdOX5xw8FV0A6Wpo2KaRHmChz" 
            alt="Logo Venta Directa"
            className="h-64 w-64 object-contain" 
          />
        </div>
        {/* Botones de Inicio de Sesión y Registro o Saludo al Usuario */}
        {!isAdmin && (
          <div className="flex items-center space-x-4">
            {!currentUser ? (
              <>
                <button 
                  onClick={onLoginClick}
                  className="bg-[#FF6F00] text-white px-4 py-2 rounded hover:bg-[#E76400] text-sm" 
                >
                  Iniciar Sesión
                </button>
                <button 
                  onClick={onRegisterClick}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                >
                  Registrarse
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">Hola, {currentUser.nombre}!</span>
                <button 
                  onClick={onLogout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Cerrar Sesión
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

// DONE