import React, { useState } from 'react';
import initialUsers from '../mock/users';
import Auth from '../utils/auth';

const UserLogin = ({ onLogin, onClose, onGoToRegister, onForgotPassword }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const foundUser = initialUsers.find(u => 
      u.correo === credentials.email && 
      u.contraseña === credentials.password
    );

    if (foundUser) {
      const token = Auth.generateToken(foundUser.id);
      Auth.login(foundUser, token);
      onLogin(foundUser);
    } else {
      setError('Correo electrónico o contraseña incorrectos.');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md relative"> {/* Ajustado padding para móviles */}
      <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700"> {/* Ajustado posición para móviles */}
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Iniciar Sesión</h2> {/* Ajustado tamaño de texto para móviles */}
      {error && <p className="text-red-500 text-center mb-3 sm:mb-4 text-sm">{error}</p>} {/* Ajustado tamaño de texto para móviles */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Ajustado espacio para móviles */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Correo Electrónico</label> {/* Ajustado tamaño de texto para móviles */}
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm" // Ajustado padding y tamaño de texto para móviles
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Contraseña</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm" // Ajustado tamaño de texto para móviles
        >
          Ingresar
        </button>
      </form>
      <p className="text-center mt-3 sm:mt-4 text-gray-600 text-sm"> {/* Ajustado margen y tamaño de texto para móviles */}
        <button onClick={onForgotPassword} className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</button>
      </p>
      <p className="text-center mt-2 text-gray-600 text-sm">
        ¿No tienes cuenta? <button onClick={onGoToRegister} className="text-blue-600 hover:underline">Regístrate aquí</button>
      </p>
    </div>
  );
};

export default UserLogin;