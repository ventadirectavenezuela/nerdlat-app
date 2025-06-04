import React from 'react';
import { CartIcon } from './Icons';

const CartSidebar = ({ cart, isOpen, onClose, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 border-l-4 border-[#E74C3C]`}>
      <div className="p-3 sm:p-4 h-full flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 sm:pb-4">
          <h2 className="text-lg sm:text-xl font-bold flex items-center text-[#2C3E50]">
            <CartIcon className="mr-2 text-[#E74C3C]" />
            Carrito ({cart.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-[#E74C3C]"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-3 sm:py-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm">Tu carrito está vacío</p>
          ) : (
            <ul className="space-y-3 sm:space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex border-b pb-3 sm:pb-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 flex-shrink-0 mr-3 sm:mr-4">
                    <img 
                      src={item.image || 'https://via.placeholder.com/300'} 
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800 text-sm sm:text-base">{item.name}</h3>
                    <p className="text-[#E74C3C] font-bold text-sm sm:text-base">${item.price.toFixed(2)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t pt-3 sm:pt-4">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="font-bold text-[#2C3E50] text-sm sm:text-base">Total:</span>
              <span className="text-[#E74C3C] font-bold text-lg sm:text-xl">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#3498DB] text-white py-2 rounded-lg hover:bg-[#2980B9] transition-colors text-sm"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;