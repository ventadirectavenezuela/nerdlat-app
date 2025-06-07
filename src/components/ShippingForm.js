import React, { useState } from 'react';

const ShippingForm = ({ onSubmit }) => {
  const [shipping, setShipping] = useState({
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(shipping);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Dirección</label>
          <input
            type="text"
            name="address"
            value={shipping.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Ciudad</label>
          <input
            type="text"
            name="city"
            value={shipping.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Código Postal</label>
          <input
            type="text"
            name="postalCode"
            value={shipping.postalCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={shipping.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          Confirmar Compra
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;