import React, { useState } from 'react';
import initialUsers from '../mock/users';
import Auth from '../utils/auth'; // Importar el nuevo módulo de autenticación

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

    initialUsers.push(newUser); // En un caso real, esto iría a una base de datos
    
    const token = Auth.generateToken(newUser.id); // Generar token
    Auth.login(newUser, token); // Guardar en localStorage
    onRegister(newUser);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold text-center mb-6">Registro de Usuario</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Documento de Identidad</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Registrarse
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        ¿Ya tienes cuenta? <button onClick={onGoToLogin} className="text-blue-600 hover:underline">Inicia sesión aquí</button>
      </p>
    </div>
  );
};

export default UserRegister;