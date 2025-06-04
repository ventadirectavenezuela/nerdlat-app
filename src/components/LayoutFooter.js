import React from 'react';

const LayoutFooter = () => {
  return (
    <footer className="bg-[#2C3E50] text-white p-4 shadow-inner mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center px-4 sm:px-6 lg:px-8"> {/* Añadido padding horizontal */}
        <div className="mb-4 md:mb-0 w-full md:w-auto">
          <p className="text-sm">Maracay, Aragua. Venezuela.</p>
          <p className="text-sm">Correo electrónico: <a href="mailto:ventadirectavenezuela@gmail.com" className="text-blue-300 hover:underline">ventadirectavenezuela@gmail.com</a></p>
        </div>
        <div className="text-sm w-full md:w-auto">
          <p>&copy; {new Date().getFullYear()} Venta Directa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default LayoutFooter;