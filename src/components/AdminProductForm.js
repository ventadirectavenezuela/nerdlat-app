import React, { useState, useEffect } from 'react';

const AdminProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        image: product.image || '',
        category: product.category || '',
        stock: product.stock || ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };
    onSubmit(processedData);
    if (!product) {
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: ''
      });
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md"> {/* Ajustado padding para móviles */}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4"> {/* Ajustado espacio para móviles */}
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Nombre*</label> {/* Ajustado tamaño de texto para móviles */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm" // Ajustado padding y tamaño de texto para móviles
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Descripción*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            rows="3"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"> {/* Ajustado gap para móviles */}
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Precio*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm">Stock*</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded text-sm"
              min="0"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">URL de Imagen*</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 text-sm">Categoría*</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 sm:space-x-4 flex-wrap gap-2"> {/* Ajustado espacio y añadido flex-wrap para móviles */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm" // Ajustado padding y tamaño de texto para móviles
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
          >
            {product ? 'Actualizar' : 'Agregar'} Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;