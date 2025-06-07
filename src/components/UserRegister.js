import React, { useState } from 'react';
import Auth from '../utils/auth';

const UserRegister = ({ onRegister, onClose, onGoToLogin }) => {
  const [formData, setFormData] = useState({
    document: '',
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // CAMBIO AQUÍ: Estado para el error de la contraseña

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // CAMBIO AQUÍ: Validación en tiempo real para la contraseña
    if (name === 'password') {
      if (value.length < 6 && value.length > 0) { // Si la longitud es menor a 6 y no está vacío
        setPasswordError('La contraseña debe tener al menos 6 caracteres.');
      } else {
        setPasswordError(''); // Limpiar el error si cumple o está vacío
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError(''); // Limpiar cualquier error de contraseña al intentar enviar
    setLoading(true);

    // CAMBIO AQUÍ: Añadir una validación básica antes de enviar
    if (formData.password.length < 6) {
      setPasswordError('La contraseña es demasiado corta. Debe tener al menos 6 caracteres.');
      setLoading(false);
      return; // Detener el envío del formulario
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          document: formData.document // Asegúrate de que esto esté descomentado para enviarlo al backend
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Auth.login(data.user, data.token || Auth.generateToken(data.user.id));
        onRegister(data.user);
      } else {
        // CAMBIO AQUÍ: Si el backend devuelve un error específico, mostrarlo
        if (data.details && data.details.includes('password') && data.details.includes('shorter')) {
            setPasswordError('La contraseña debe tener al menos 6 caracteres.');
        } else {
            setError(data.message || 'Error al registrarse. Inténtalo de nuevo.');
        }
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor. Inténtalo más tarde.');
      console.error('Error de conexión:', err);
    } finally {
      setLoading(false);
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
            className={`w-full p-2 border rounded text-sm ${passwordError ? 'border-red-500' : 'border-gray-300'}`} // CAMBIO AQUÍ: Resaltar borde
            required
          />
          {/* CAMBIO AQUÍ: Mostrar mensaje de error */}
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>
        <button
          type="submit"
          disabled={loading}
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