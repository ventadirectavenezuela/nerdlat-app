import React, { useState } from 'react';
import initialUsers from '../mock/users';
import Auth from '../utils/auth'; // Importar el nuevo módulo de autenticación

const UserLogin = ({ onLogin, onClose, onGoToRegister }) => {
  const [credentials, setCredentials] = useState({
    document: '',
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
      u.documento === credentials.document && 
      u.contraseña === credentials.password
    );

    if (foundUser) {
      const token = Auth.generateToken(foundUser.id); // Generar token
      Auth.login(foundUser, token); // Guardar en localStorage
      onLogin(foundUser); // Pasar el usuario al App.js
    } else {
      setError('Documento o contraseña incorrectos.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Documento de Identidad</label>
          <input
            type="text"
            name="document"
            value={credentials.document}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Ingresar
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        ¿No tienes cuenta? <button onClick={onGoToRegister} className="text-blue-600 hover:underline">Regístrate aquí</button>
      </p>
    </div>
  );
};

export default UserLogin;