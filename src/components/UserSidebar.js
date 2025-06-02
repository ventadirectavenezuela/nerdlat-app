import React from 'react';

const UserSidebar = ({ isOpen, onClose, onNavigate, notificationsCount }) => {
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#2C3E50]">Menú</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul className="py-4 space-y-2">
        <li>
          <button onClick={() => onNavigate('notifications')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notificaciones
            {notificationsCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">{notificationsCount}</span>
            )}
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate('help')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9.247a4.75 4.75 0 010 5.506L15 19l-2.228-2.247a4.75 4.75 0 01-5.544-5.506L9 5l2.228 2.247a4.75 4.75 0 015.544 5.506L9 19l2.228-2.247a4.75 4.75 0 01-5.544-5.506z" />
            </svg>
            Ayuda
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate('my_purchases')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Mis compras
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate('favorites')} className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Favoritos
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;