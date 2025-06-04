import React, { useState } from 'react';
import initialUsers from '../mock/users';
import Auth from '../utils/auth';

const UserRegister = ({ onRegister, onClose, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (initialUsers.some(u => u.documento === formData.document)) {
      setError('Ya existe un usuario con este documento.');
      return;
    }

    const newUser = {
      id: Date.now(),
      usuario: formData.document,
      contraseña: formData.password,
      nombre: formData.name,
      apellido: '',
      correo: formData.email,
      documento: formData.document,
      rol: 'Cliente',
      estado: 'activo',
      autenticacion_mfa: false,
      fechaCreacion: new Date().toISOString()
    };

    initialUsers.push(newUser);
    
    const token = Auth.generateToken(newUser.id);
    Auth.login(newUser, token);
    onRegister(newUser);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md relative"> {/* Ajustado padding para móviles */}
      <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"> {/* Ajustado posición para móviles */}
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Registro de Usuario</h2> {/* Ajustado tamaño de texto para móviles */}
      {error && <p className="text-red-500 text-center mb-3 sm:mb-4 text-sm">{error}</p>} {/* Ajustado tamaño de texto para móviles */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Ajustado espacio para móviles */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Documento de Identidad</label> {/* Ajustado tamaño de texto para móviles */}
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm" // Ajustado padding y tamaño de texto para móviles
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm" // Ajustado tamaño de texto para móviles
        >
          Registrarse
        </button>
      </form>
      <p className="text-center mt-3 sm:mt-4 text-gray-600 text-sm"> {/* Ajustado margen y tamaño de texto para móviles */}
        ¿Ya tienes cuenta? <button onClick={onGoToLogin} className="text-blue-600 hover:underline">Inicia sesión aquí</button>
      </p>
    </div>
  );
};

export default UserRegister;