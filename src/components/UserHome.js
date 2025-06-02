import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import CartSidebar from './CartSidebar';
import CheckoutForm from './CheckoutForm'; // Este es el formulario de envío original
import PaymentConfirmationForm from './PaymentConfirmationForm'; // Importar el nuevo formulario
import UserLogin from './UserLogin';
import UserRegister from './UserRegister';
import SearchBar from './SearchBar';
import QuickFilters from './QuickFilters';
import UserSidebar from './UserSidebar';

const UserHome = ({ products, onLogin, currentUser, onLogout }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false); // Para el formulario de envío original
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false); // Nuevo estado para el formulario de pago
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [notificationsCount, setNotificationsCount] = useState(3);

  useState(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearch = (searchTerm) => {
    if (searchTerm) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleQuickFilter = (filterType, category = null) => {
    let results = [...products];
    if (category) {
      results = results.filter(p => p.category === category);
    } else {
      switch (filterType) {
        case 'ofertas':
          results = results.filter(p => p.price < 500);
          break;
        case 'mas_vendidos':
          results = results.sort((a, b) => b.rating - a.rating);
          break;
        case 'novedades':
          results = results.sort((a, b) => b.id - a.id);
          break;
        case 'envio_gratis':
          results = results.filter(p => p.price > 100);
          break;
        case 'marcas_destacadas':
          results = results.filter(p => p.category === 'Electrónica');
          break;
        case 'all':
          results = products;
          break;
        default:
          break;
      }
    }
    setFilteredProducts(results);
  };

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const toggleFavorite = (product) => {
    if (favorites.some(fav => fav.id === product.id)) {
      setFavorites(prev => prev.filter(fav => fav.id !== product.id));
    } else {
      setFavorites(prev => [...prev, product]);
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert('Por favor, inicia sesión o regístrate para continuar con la compra.');
      setShowLoginModal(true);
      return;
    }
    // Al hacer checkout, ahora vamos al formulario de confirmación de pago
    setShowPaymentConfirmation(true);
    setIsCartOpen(false);
  };

  const handlePaymentConfirmationSubmit = ({ paymentData, shippingData }) => {
    alert('¡Información de pago y envío recibida! Tu pedido será validado pronto.');
    console.log('Datos de Pago:', paymentData);
    console.log('Datos de Envío:', shippingData);
    setCart([]); // Vaciar carrito
    setShowPaymentConfirmation(false); // Cerrar formulario
  };

  const handleOrderSubmit = (shippingInfo) => {
    // Este handler ya no se usará directamente para el flujo principal de checkout
    // pero se mantiene por si acaso.
    alert(`¡Pedido confirmado! Se enviará a: ${shippingInfo.address}\nTotal: $${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`);
    setCart([]);
    setShowCheckout(false);
  };

  const handleUserLogin = (user) => {
    onLogin(user);
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleUserRegister = (user) => {
    onLogin(user);
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const handleSidebarNavigation = (section) => {
    setIsSidebarOpen(false);
    if (section === 'favorites') {
      setFilteredProducts(favorites);
    } else {
      alert(`Navegando a: ${section}`);
      setFilteredProducts(products);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Catálogo de Productos</h1>
        <div className="flex items-center space-x-4">
          {/* Botón para abrir el sidebar */}
          {currentUser && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          {/* Botón de Carrito (solo si hay usuario logueado) */}
          {currentUser && (
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Carrito ({cart.length})
            </button>
          )}
        </div>
      </div>

      <SearchBar products={products} onSearch={handleSearch} />
      <QuickFilters products={products} onFilterChange={handleQuickFilter} />

      {showPaymentConfirmation ? ( // Mostrar el nuevo formulario de confirmación de pago
        <PaymentConfirmationForm 
          onSubmit={handlePaymentConfirmationSubmit} 
          onBack={() => setShowPaymentConfirmation(false)}
        />
      ) : showCheckout ? ( // Este es el formulario de envío original, ahora menos prioritario
        <CheckoutForm 
          onSubmit={handleOrderSubmit} 
          onBack={() => setShowCheckout(false)}
        />
      ) : (
        <ProductGrid 
          products={filteredProducts} 
          onAddToCart={addToCart} 
          onToggleFavorite={toggleFavorite} 
          favorites={favorites} 
        />
      )}

      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleSidebarNavigation}
        notificationsCount={notificationsCount}
      />

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserLogin 
            onLogin={handleUserLogin} 
            onClose={() => setShowLoginModal(false)} 
            onGoToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true); }} 
          />
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserRegister 
            onRegister={handleUserRegister} 
            onClose={() => setShowRegisterModal(false)} 
            onGoToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true); }} 
          />
        </div>
      )}
    </div>
  );
};

export default UserHome;

// DONE