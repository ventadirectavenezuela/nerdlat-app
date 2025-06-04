import React, { useState } from 'react';
// No necesitamos initialUsers aquí, la autenticación la hará el backend
import Auth from '../utils/auth';

const UserRegister = ({ onRegister, onClose, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Iniciar carga

    try {
      // Petición al backend para registrar un nuevo usuario
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // El backend espera email, password, name. El documento se puede añadir al modelo si es necesario.
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password, 
          name: formData.name,
          // Puedes añadir el documento aquí si el backend lo espera:
          // document: formData.document 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si el registro es exitoso, iniciar sesión automáticamente
        Auth.login(data.user, data.token || Auth.generateToken(data.user.id)); // Usar token del backend o generar uno si no viene
        onRegister(data.user); // Notificar a App.js
      } else {
        setError(data.message || 'Error al registrarse. Inténtalo de nuevo.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      console.error('Error de conexión:', err);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md relative">
      <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700">
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Registro de Usuario</h2>
      {error && <p className="text-red-500 text-center mb-3 sm:mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Documento de Identidad</label>
          <input
            type="text"
            name="document"
            value={formData.document}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
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
          disabled={loading} // Deshabilitar botón durante la carga
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className="text-center mt-3 sm:mt-4 text-gray-600 text-sm">
        ¿Ya tienes cuenta? <button onClick={onGoToLogin} className="text-blue-600 hover:underline">Inicia sesión aquí</button>
      </p>
    </div>
  );
};

export default UserRegister;