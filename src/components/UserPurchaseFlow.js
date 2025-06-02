import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import ShippingForm from './ShippingForm';

const UserPurchaseFlow = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [showShipping, setShowShipping] = useState(false);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const handleCheckout = () => {
    setShowShipping(true);
  };

  const handleShippingSubmit = (shippingData) => {
    alert(`Compra confirmada! Envío a: ${shippingData.address}`);
    setCart([]);
    setShowShipping(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!showShipping ? (
        <>
          <ProductGrid products={products} onAddToCart={addToCart} />
          {cart.length > 0 && (
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Tu Carrito ({cart.length})</h2>
              <button
                onClick={handleCheckout}
                className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
              >
                Finalizar Compra
              </button>
            </div>
          )}
        </>
      ) : (
        <ShippingForm onSubmit={handleShippingSubmit} />
      )}
    </div>
  );
};

export default UserPurchaseFlow;