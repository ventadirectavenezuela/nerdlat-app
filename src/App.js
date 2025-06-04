import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import AdminDashboard from './components/AdminDashboard';
import UserHome from './components/UserHome';
import UserLogin from './components/UserLogin';
import UserRegister from './components/UserRegister';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import initialProducts from './mock/products';
import initialUsers from './mock/users';
import Auth from './utils/auth';

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // Cambiado a 'home' por defecto

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    
    if (savedProducts) setProducts(savedProducts);
    if (savedUsers) setUsers(savedUsers);

    const storedUser = Auth.getCurrentUser();
    if (storedUser) {
      const fullUser = users.find(u => u.id === storedUser.id);
      if (fullUser) {
        setCurrentUser(fullUser);
        setCurrentPage('home');
      } else {
        Auth.logout();
      }
    }
  }, [users]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    Auth.logout();
    setCurrentUser(null);
    setCurrentPage('home'); // Al cerrar sesión, volver a la vista principal de usuario
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(u => 
      u.id === updatedUser.id ? updatedUser : u
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedUser);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    Auth.login(updatedUser, Auth.getToken());
  };

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleGoHome = () => {
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LayoutHeader 
        isAdmin={currentUser && currentUser.rol === 'Administrador'}
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
        onGoHome={handleGoHome}
      />
      
      <main className="flex-grow">
        {currentUser && currentUser.rol === 'Administrador' ? (
          <AdminDashboard 
            products={products}
            admin={currentUser}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateAdmin={handleUpdateUser}
            onLogout={handleLogout}
          />
        ) : (
          <UserHome 
            products={products}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onUpdateUser={handleUpdateUser}
            showLoginModal={showLoginModal}
            setShowLoginModal={setShowLoginModal}
            showRegisterModal={showRegisterModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        )}
      </main>

      <LayoutFooter />

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserLogin 
            onLogin={handleLogin} 
            onClose={() => setShowLoginModal(false)} 
            onGoToRegister={() => { setShowLoginModal(false); setShowRegisterModal(true); }} 
            onForgotPassword={() => { setShowLoginModal(false); setShowForgotPasswordModal(true); }}
          />
        </div>
      )}

      {showRegisterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserRegister 
            onRegister={handleLogin} 
            onClose={() => setShowRegisterModal(false)} 
            onGoToLogin={() => { setShowRegisterModal(false); setShowLoginModal(true); }} 
          />
        </div>
      )}

      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ForgotPasswordModal 
            onClose={() => setShowForgotPasswordModal(false)} 
          />
        </div>
      )}
    </div>
  );
};

export default App;

// DONE