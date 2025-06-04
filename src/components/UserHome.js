import React, { useState } from 'react';
import ProductGrid from './ProductGrid';
import CartSidebar from './CartSidebar';
import PaymentConfirmationForm from './PaymentConfirmationForm';
import SearchBar from './SearchBar';
import QuickFilters from './QuickFilters';
import UserSidebar from './UserSidebar';
import ProductDetailModal from './ProductDetailModal'; // Importar el modal de detalle

const UserHome = ({ products, onLogin, currentUser, onLogout, onUpdateUser }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [notificationsCount, setNotificationsCount] = useState(3);
  const [currentViewInHome, setCurrentViewInHome] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

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
      return;
    }
    setShowPaymentConfirmation(true);
    setIsCartOpen(false);
  };

  const handlePaymentConfirmationSubmit = ({ paymentData, shippingData }) => {
    alert('¡Información de pago y envío recibida! Tu pedido será validado pronto.');
    console.log('Datos de Pago:', paymentData);
    console.log('Datos de Envío:', shippingData);
    setCart([]);
    setShowPaymentConfirmation(false);
    setCurrentViewInHome('catalog');
  };

  const handleSidebarNavigation = (section) => {
    setIsSidebarOpen(false);
    setCurrentViewInHome(section);
    if (section === 'favorites') {
      setFilteredProducts(favorites);
    } else if (section === 'catalog') {
      setFilteredProducts(products);
    } else {
      alert(`Navegando a: ${section}`);
    }
  };

  const handleUpdateUserShipping = (shippingAddress) => {
    const updatedUser = { ...currentUser, shippingAddress };
    onUpdateUser(updatedUser);
    alert('Dirección de envío actualizada.');
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const renderUserHomeContent = () => {
    if (showPaymentConfirmation) {
      return (
        <PaymentConfirmationForm 
          onSubmit={handlePaymentConfirmationSubmit} 
          onBack={() => setShowPaymentConfirmation(false)}
        />
      );
    }

    switch (currentViewInHome) {
      case 'catalog':
        return (
          <>
            <SearchBar products={products} onSearch={handleSearch} />
            <QuickFilters products={products} onFilterChange={handleQuickFilter} />
            <ProductGrid 
              products={filteredProducts} 
              onAddToCart={addToCart} 
              onToggleFavorite={toggleFavorite} 
              favorites={favorites}
              onProductClick={handleProductClick} // Pasar la función para abrir el modal
            />
          </>
        );
      case 'favorites':
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Mis Favoritos</h2>
            {favorites.length > 0 ? (
              <ProductGrid 
                products={favorites} 
                onAddToCart={addToCart} 
                onToggleFavorite={toggleFavorite} 
                favorites={favorites} 
                onProductClick={handleProductClick}
              />
            ) : (
              <p className="text-gray-600">Aún no tienes productos favoritos.</p>
            )}
          </>
        );
      case 'my_account':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Mi Cuenta</h2>
            <h3 className="text-lg font-bold mb-2">Mis Datos Personales</h3>
            <p className="text-sm text-gray-700">Nombre: {currentUser?.nombre} {currentUser?.apellido}</p>
            <p className="text-sm text-gray-700">Correo: {currentUser?.correo}</p>
            <p className="text-sm text-gray-700">Documento: {currentUser?.documento}</p>

            <h3 className="text-lg font-bold mt-4 mb-2">Dirección de Envío Preestablecida</h3>
            {currentUser?.shippingAddress ? (
              <p className="text-sm text-gray-700">
                {currentUser.shippingAddress.address}, {currentUser.shippingAddress.city}, {currentUser.shippingAddress.state}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No hay dirección preestablecida.</p>
            )}
            <button 
              onClick={() => { /* Lógica para mostrar formulario de envío */ }}
              className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
            >
              {currentUser?.shippingAddress ? 'Modificar' : 'Establecer'}
            </button>
          </div>
        );
      case 'notifications':
        return <h2 className="text-2xl font-bold mb-6">Mis Notificaciones (Simulado)</h2>;
      case 'my_purchases':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Mis Compras</h2>
            <p className="text-gray-600 mb-4">Aquí verás tu historial de compras y el estado de tus envíos.</p>
            <p className="text-gray-500 text-sm">
              (Funcionalidad de seguimiento de envíos y gestión de devoluciones requiere integración con servicios externos y backend.)
            </p>
          </div>
        );
      case 'help':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Ayuda y Soporte</h2>
            <p className="text-gray-600 mb-4">Encuentra respuestas a tus preguntas frecuentes o contacta a nuestro equipo.</p>
            <ul className="list-disc list-inside text-blue-600 space-y-2">
              <li><a href="#" className="hover:underline">Preguntas Frecuentes (FAQs)</a></li>
              <li><a href="#" className="hover:underline">Contactar Soporte (Chat en vivo simulado)</a></li>
              <li><a href="#" className="hover:underline">Políticas de Devolución</a></li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold hidden sm:block">Catálogo de Productos</h1>
        <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
          {/* Botón para abrir el sidebar */}
          {currentUser && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
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
              className="flex items-center bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
            >
              <svg className="w-5 h-5 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="hidden sm:inline">Carrito</span> ({cart.length})
            </button>
          )}
        </div>
      </div>

      {renderUserHomeContent()}

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
        currentUser={currentUser}
        onUpdateUserShipping={handleUpdateUserShipping}
      />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          isFavorite={favorites.some(fav => fav.id === selectedProduct.id)}
        />
      )}
    </div>
  );
};

export default UserHome;