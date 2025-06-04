import React, { useState, useEffect } from 'react';

const AdminProfile = ({ admin, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState({ ...admin });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormData({ ...admin });
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.usuario || !formData.correo || !formData.nombre) {
      setError('Los campos marcados con * son obligatorios');
      return;
    }

    if (isEditing && formData.contraseña && formData.contraseña.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    onUpdate(formData);
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Ajustado padding para móviles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6"> {/* Ajustado para apilar en móviles */}
        <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Perfil de Administrador</h2> {/* Ajustado tamaño de texto para móviles */}
        <div className="flex space-x-2"> {/* Añadido contenedor para botones */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm" // Ajustado padding y tamaño de texto para móviles
            >
              Editar Perfil
            </button>
          ) : (
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({ ...admin });
              }}
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-3 sm:mb-4 text-sm">{error}</p>} {/* Ajustado margen y tamaño de texto para móviles */}

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Ajustado espacio para móviles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"> {/* Ajustado gap para móviles */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Usuario*</label> {/* Ajustado tamaño de texto para móviles */}
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm" // Ajustado padding y tamaño de texto para móviles
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Correo Electrónico*</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Nombre*</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Documento</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Nueva Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              placeholder="Dejar en blanco para no cambiar"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </form>

      <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t"> {/* Ajustado margen y padding para móviles */}
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;