import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import CartSidebar from './CartSidebar';
import CheckoutForm from './CheckoutForm';

const UserView = ({ products }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setIsCartOpen(false);
  };

  const handleOrderSubmit = (shippingInfo) => {
    alert(`¡Pedido confirmado! Se enviará a: ${shippingInfo.address}\nTotal: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    setCart([]);
    setShowCheckout(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Carrito ({cart.length})
        </button>
      </div>

      {showCheckout ? (
        <CheckoutForm 
          onSubmit={handleOrderSubmit} 
          onBack={() => setShowCheckout(false)}
        />
      ) : (
        <ProductGrid products={products} onAddToCart={addToCart} />
      )}

      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default UserView;