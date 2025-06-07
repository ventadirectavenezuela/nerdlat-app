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
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(''); // Estado de error

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
    } else {
      // Limpiar formulario si no estamos editando
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        stock: ''
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validaciones básicas antes de enviar
      if (!formData.name || !formData.description || !formData.price || !formData.image || !formData.category || !formData.stock) {
        setError('Todos los campos son obligatorios.');
        return;
      }
      if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
        setError('El precio debe ser un número positivo.');
        return;
      }
      if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
        setError('El stock debe ser un número no negativo.');
        return;
      }

      // Llamar a la función onSubmit pasada por props (handleAddProduct o handleUpdateProduct)
      await onSubmit({
        ...formData,
        id: product ? product.id : undefined, // Añadir ID si estamos editando
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });

      // Limpiar formulario solo si es una creación exitosa
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
    } catch (err) {
      setError('Error al procesar la solicitud.');
      console.error('Error en AdminProductForm handleSubmit:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
      {error && <p className="text-red-500 mb-3 sm:mb-4 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 text-sm">Nombre*</label>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
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

        <div className="flex justify-end space-x-2 sm:space-x-4 flex-wrap gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            disabled={loading} // Deshabilitar botón durante la carga
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm disabled:opacity-50"
          >
            {loading ? (product ? 'Actualizando...' : 'Agregando...') : (product ? 'Actualizar' : 'Agregar')} Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;