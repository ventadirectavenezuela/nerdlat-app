import React, { useState, useEffect } from 'react';

const UserSidebar = ({ isOpen, onClose, onNavigate, notificationsCount, currentUser, onUpdateUserShipping }) => {
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(currentUser?.shippingAddress || {
    address: '', city: '', state: '', postalCode: '', phone: ''
  });

  // Sincronizar la dirección de envío si el currentUser cambia
  useEffect(() => {
    if (currentUser?.shippingAddress) {
      setShippingAddress(currentUser.shippingAddress);
    } else {
      setShippingAddress({ address: '', city: '', state: '', postalCode: '', phone: '' });
    }
  }, [currentUser]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveShipping = () => {
    if (!shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode || !shippingAddress.phone) {
      alert('Por favor, completa todos los campos de la dirección de envío.');
      return;
    }
    onUpdateUserShipping(shippingAddress);
    setShowShippingForm(false);
  };

  return (
    <>
      {/* Overlay para cerrar el sidebar al hacer clic fuera */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out z-[1001]`}> {/* z-index 1001 */}
        {/* Encabezado del Sidebar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 mb-2.5"> {/* sidebar-header */}
          <div className="flex items-center font-bold text-[#333]"> {/* user-info */}
            {/* Icono de Usuario */}
            <svg className="w-8 h-8 mr-2.5 text-[#ffd700]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a4 4 0 00-4 4h8a4 4 0 00-4-4z" clipRule="evenodd" />
            </svg>
            <span>Hola <span id="userNameDisplay">{currentUser ? currentUser.nombre : 'Invitado'}</span></span> {/* Nombre dinámico */}
          </div>
          {/* Botón de Cerrar */}
          <button onClick={onClose} className="text-gray-600 text-2xl ml-auto p-1 hover:text-[#333] bg-transparent"> {/* closebtn */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Opciones Principales del Menú */}
        <ul className="py-2"> {/* Sin padding-top: 20px en el ul, ya está en el header */}
          <li>
            <button onClick={() => onNavigate('catalog')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7 7-7M19 10v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h.01" />
              </svg>
              Inicio
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('search')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Buscar
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('notifications')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notificaciones
              {notificationsCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{notificationsCount}</span>
              )}
            </button>
          </li>
          <li>
            <a href="mailto:soporte@ventadirecta.com?Subject=Consulta desde la app Venta Directa" className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.247a4.75 4.75 0 010 5.506L15 19l-2.228-2.247a4.75 4.75 0 01-5.544-5.506L9 5l2.228 2.247a4.75 4.75 0 015.544 5.506L9 19l2.228-2.247a4.75 4.75 0 01-5.544-5.506z" />
              </svg>
              Ayuda
            </a>
          </li>
          <li>
            <button onClick={() => onNavigate('my_purchases')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Mis compras
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('favorites')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favoritos
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('history')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Historial
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('my_account')} className="flex items-center w-full py-3 px-4 text-lg text-[#333] hover:bg-gray-100 hover:text-[#007bff] transition-colors">
              <svg className="w-5 h-5 mr-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Mi cuenta
            </button>
          </li>
        </ul>

        {/* Contenido de Mi Cuenta (se mantiene aquí, pero se muestra condicionalmente en UserHome) */}
        {onNavigate === 'my_account' && ( // Esto es un placeholder, la navegación real sería más compleja
          <div className="p-3 sm:p-4 border-t mt-4">
            <h3 className="text-lg font-bold mb-2">Mis Datos Personales</h3>
            <p className="text-sm text-gray-700">Nombre: {currentUser?.nombre} {currentUser?.apellido}</p>
            <p className="text-sm text-gray-700">Correo: {currentUser?.correo}</p>
            <p className="text-sm text-gray-700">Documento: {currentUser?.documento}</p>

            <h3 className="text-lg font-bold mt-4 mb-2">Dirección de Envío Preestablecida</h3>
            {!showShippingForm ? (
              <>
                {currentUser?.shippingAddress ? (
                  <p className="text-sm text-gray-700">
                    {currentUser.shippingAddress.address}, {currentUser.shippingAddress.city}, {currentUser.shippingAddress.state}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">No hay dirección preestablecida.</p>
                )}
                <button 
                  onClick={() => setShowShippingForm(true)}
                  className="mt-2 bg-blue-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-blue-600"
                >
                  {currentUser?.shippingAddress ? 'Modificar' : 'Establecer'}
                </button>
              </>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveShipping(); }} className="space-y-2">
                <input type="text" name="address" placeholder="Dirección" value={shippingAddress.address} onChange={handleShippingChange} className="w-full p-1 border rounded text-sm" required />
                <input type="text" name="city" placeholder="Ciudad" value={shippingAddress.city} onChange={handleShippingChange} className="w-full p-1 border rounded text-sm" required />
                <input type="text" name="state" placeholder="Estado" value={shippingAddress.state} onChange={handleShippingChange} className="w-full p-1 border rounded text-sm" required />
                <input type="text" name="postalCode" placeholder="Código Postal" value={shippingAddress.postalCode} onChange={handleShippingChange} className="w-full p-1 border rounded text-sm" required />
                <input type="tel" name="phone" placeholder="Teléfono" value={shippingAddress.phone} onChange={handleShippingChange} className="w-full p-1 border rounded text-sm" required />
                <div className="flex space-x-2">
                  <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-green-600">Guardar</button>
                  <button type="button" onClick={() => setShowShippingForm(false)} className="bg-gray-500 text-white px-2 py-1 rounded text-xs sm:text-sm hover:bg-gray-600">Cancelar</button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserSidebar;