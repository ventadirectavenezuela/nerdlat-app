import React, { useState, useEffect } from 'react';
import LayoutHeader from './components/LayoutHeader';
import LayoutFooter from './components/LayoutFooter';
import AdminDashboard from './components/AdminDashboard';
import UserHome from './components/UserHome';
import initialProducts from './mock/products';
import initialUsers from './mock/users';
import Auth from './utils/auth';

const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(initialUsers);
  const [showLoginModal, setShowLoginModal] = useState(false); // Estado para controlar el modal de login
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para controlar el modal de registro

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
      } else {
        Auth.logout();
      }
    }
  }, [users]); // Añadido users como dependencia para que el useEffect se ejecute cuando users esté cargado

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowLoginModal(false); // Cerrar modal al loguearse
    setShowRegisterModal(false); // Asegurarse que el de registro esté cerrado
  };

  const handleLogout = () => {
    Auth.logout();
    setCurrentUser(null);
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <LayoutHeader 
        isAdmin={currentUser && currentUser.rol === 'Administrador'}
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow py-8">
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
    </div>
  );
};

export default App;

// DONE