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

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    const savedUsers = JSON.parse(localStorage.getItem('users'));
    
    if (savedProducts) setProducts(savedProducts);
    if (savedUsers) setUsers(savedUsers);

    const storedUser = Auth.getCurrentUser();
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    Auth.logout();
    setCurrentUser(null);
  };

  const handleUpdateAdmin = (updatedAdmin) => {
    const updatedUsers = users.map(u => 
      u.id === updatedAdmin.id ? updatedAdmin : u
    );
    setUsers(updatedUsers);
    setCurrentUser(updatedAdmin);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    Auth.login(updatedAdmin, Auth.getToken());
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
        onLoginClick={() => { /* No se usa directamente aquí, se maneja en UserHome */ }}
        onRegisterClick={() => { /* No se usa directamente aquí, se maneja en UserHome */ }}
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
            onUpdateAdmin={handleUpdateAdmin}
            onLogout={handleLogout}
          />
        ) : (
          <UserHome 
            products={products}
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
      </main>

      <LayoutFooter />
    </div>
  );
};

export default App;

// DONE