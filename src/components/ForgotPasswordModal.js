import React, { useState } from 'react';

const ForgotPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // 'message' es un estado, no una prop read-only

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica real para enviar un correo de recuperación.
    // Por ahora, solo simulamos el envío.
    setMessage(`Se ha enviado un enlace de recuperación a ${email}.`);
    setEmail('');
    // En un caso real, podrías cerrar el modal después de un tiempo o al hacer clic en un botón de "Ok"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Recuperar Contraseña</h2>
        {message ? (
          <p className="text-green-600 text-center mb-3 sm:mb-4 text-sm">{message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-gray-700 mb-1 text-sm">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Ingresa tu correo"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-sm"
            >
              Enviar Enlace de Recuperación
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

// DONE