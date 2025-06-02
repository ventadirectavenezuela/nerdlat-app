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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Perfil de Administrador</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Editar Perfil
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setFormData({ ...admin });
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Usuario*</label>
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Correo Electrónico*</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Nombre*</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!isEditing}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Documento</label>
          <input
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div>
            <label className="block text-gray-700 mb-1">Nueva Contraseña</label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Dejar en blanco para no cambiar"
            />
            <p className="text-xs text-gray-500 mt-1">Mínimo 8 caracteres</p>
          </div>
        )}

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 pt-4 border-t">
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;