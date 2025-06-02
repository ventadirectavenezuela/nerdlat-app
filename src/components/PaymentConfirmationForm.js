import React, { useState } from 'react';

const PaymentConfirmationForm = ({ onSubmit, onBack }) => {
  const [paymentData, setPaymentData] = useState({
    bank: '',
    transactionNumber: '',
    paymentDate: '',
    amount: '',
    proof: null // Para el archivo adjunto
  });
  const [shippingData, setShippingData] = useState({
    city: '',
    state: '',
    agencyNumber: '',
    agencyAddress: '',
    shippingCompany: ''
  });
  const [error, setError] = useState('');

  const handlePaymentChange = (e) => {
    const { name, value, files } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validaciones básicas
    if (!paymentData.bank || !paymentData.transactionNumber || !paymentData.paymentDate || !paymentData.amount ||
        !shippingData.city || !shippingData.state || !shippingData.agencyNumber || !shippingData.agencyAddress || !shippingData.shippingCompany) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (isNaN(paymentData.amount) || parseFloat(paymentData.amount) <= 0) {
      setError('El monto pagado debe ser un número positivo.');
      return;
    }
    if (isNaN(shippingData.agencyNumber) || parseInt(shippingData.agencyNumber) <= 0) {
      setError('El número de agencia debe ser un número positivo.');
      return;
    }

    onSubmit({ paymentData, shippingData });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Confirmación de Pago y Envío</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Formulario de Confirmación de Pago */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detalles del Pago</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Banco emisor*</label>
              <input
                type="text"
                name="bank"
                value={paymentData.bank}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número de transacción*</label>
              <input
                type="text"
                name="transactionNumber"
                value={paymentData.transactionNumber}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Fecha del pago*</label>
              <input
                type="date"
                name="paymentDate"
                value={paymentData.paymentDate}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Monto pagado*</label>
              <input
                type="number"
                name="amount"
                value={paymentData.amount}
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded"
                step="0.01"
                min="0.01"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-1">Adjuntar comprobante de pago (opcional)</label>
              <input
                type="file"
                name="proof"
                onChange={handlePaymentChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Formulario de Envío */}
        <div className="border p-4 rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detalles del Envío</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Ciudad*</label>
              <input
                type="text"
                name="city"
                value={shippingData.city}
                onChange={handleShippingChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Estado*</label>
              <input
                type="text"
                name="state"
                value={shippingData.state}
                onChange={handleShippingChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Número de agencia*</label>
              <input
                type="number"
                name="agencyNumber"
                value={shippingData.agencyNumber}
                onChange={handleShippingChange}
                className="w-full p-2 border border-gray-300 rounded"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Dirección de la agencia*</label>
              <input
                type="text"
                name="agencyAddress"
                value={shippingData.agencyAddress}
                onChange={handleShippingChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Empresa de envío*</label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="shippingCompany"
                    value="MRW"
                    checked={shippingData.shippingCompany === 'MRW'}
                    onChange={handleShippingChange}
                    className="form-radio text-blue-600"
                    required
                  />
                  <span className="ml-2 text-gray-700">MRW</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="shippingCompany"
                    value="ZOOM"
                    checked={shippingData.shippingCompany === 'ZOOM'}
                    onChange={handleShippingChange}
                    className="form-radio text-blue-600"
                    required
                  />
                  <span className="ml-2 text-gray-700">ZOOM</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Volver al Carrito
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Confirmar y Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentConfirmationForm;