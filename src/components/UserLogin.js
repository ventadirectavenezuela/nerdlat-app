import React, { useState } from 'react';
// No necesitamos initialUsers aquí, la autenticación la hará el backend
import Auth from '../utils/auth';

const UserLogin = ({ onLogin, onClose, onGoToRegister, onForgotPassword }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Estado de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Iniciar carga

    try {
      // Petición al backend para iniciar sesión
      // CAMBIO AQUÍ: La URL debe apuntar al puerto 5000 del backend
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Si la respuesta es exitosa, guardar el usuario y el token
        Auth.login(data.user, data.token); // Auth.js ahora usa el token del backend
        onLogin(data.user); // Notificar a App.js que el usuario ha iniciado sesión
      } else {
        // Si hay un error en la respuesta del backend
        setError(data.message || 'Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } catch (err) {
      // Si hay un error de red o el servidor no responde
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
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Iniciar Sesión</h2>
      {error && <p className="text-red-500 text-center mb-3 sm:mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading} // Deshabilitar botón durante la carga
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Iniciando...' : 'Ingresar'}
        </button>
      </form>
      <p className="text-center mt-3 sm:mt-4 text-gray-600 text-sm">
        <button onClick={onForgotPassword} className="text-blue-600 hover:underline">¿Olvidaste tu contraseña?</button>
      </p>
      <p className="text-center mt-2 text-gray-600 text-sm">
        ¿No tienes cuenta? <button onClick={onGoToRegister} className="text-blue-600 hover:underline">Regístrate aquí</button>
      </p>
    </div>
  );
};

export default UserLogin;