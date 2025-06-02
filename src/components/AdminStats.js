import React from 'react';

const AdminStats = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Estadísticas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-sm font-semibold text-blue-600 mb-1">Productos Totales</h3>
          <p className="text-2xl font-bold">{totalProducts}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-sm font-semibold text-green-600 mb-1">Valor Total</h3>
          <p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="text-sm font-semibold text-purple-600 mb-1">Precio Promedio</h3>
          <p className="text-2xl font-bold">${avgPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Productos por Categoría</h3>
        <div className="bg-white border rounded-lg p-4">
          {/* Aquí iría un gráfico en una implementación real */}
          <p className="text-gray-500 text-center py-8">Gráfico de categorías (simulado)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;