import React, { useState } from 'react';

const EditableMessage = () => {
  const [message, setMessage] = useState('Mensaje inicial');
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí podrías agregar lógica para guardar en localStorage si es necesario
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <button 
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-gray-800">{message}</p>
          <button
            onClick={handleEdit}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Editar
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableMessage;