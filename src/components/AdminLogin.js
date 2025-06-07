import React, { useState } from 'react';
import initialUsers from '../mock/users';

const AdminLogin = ({ onLogin, onBack }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adminUser = initialUsers.find(u => 
      u.usuario === credentials.username && 
      u.contraseña === credentials.password &&
      u.rol === 'Administrador'
    );

    if (adminUser) {
      onLogin(adminUser);
    } else {
      setError('Credenciales de administrador incorrectas.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#2C3E50] to-[#4CA1AF]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border-t-4 border-[#E74C3C] relative">
        <button onClick={onBack} className="absolute top-4 left-4 text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex justify-center mb-6">
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0YLd231HLxysUGcrlHAMdQ0Ba6XFOPIJgkW1b" 
            alt="Logo Venta Directa"
            className="h-16 w-16 object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2C3E50]">Acceso de Administrador</h2>
        {error && <p className="text-[#E74C3C] text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#2C3E50] mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-[#2C3E50] mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#3498DB] focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#E74C3C] text-white py-2 rounded-lg hover:bg-[#C0392B] transition-colors"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;