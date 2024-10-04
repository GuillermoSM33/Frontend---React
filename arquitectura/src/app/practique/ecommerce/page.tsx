"use client";

import React, { useState, useMemo } from 'react';

const initialCart = [
  { id: 1, name: 'Laptop', quantity: 1 },
  { id: 2, name: 'Auriculares', quantity: 2 },
  { id: 3, name: 'Monitor', quantity: 1 },
];

const CartApp: React.FC = () => {
  const [cart, setCart] = useState(initialCart);

  const totalQuantity = useMemo(() => {
    console.log('Calculando total de productos...');
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Carrito de compras
      </h1>

      <h2 className="text-xl font-semibold mb-4">
        Total de productos en el carrito: <span className="font-bold text-indigo-600">{totalQuantity}</span>
      </h2>

      <ul className="divide-y divide-gray-200 mb-4">
        {cart.map(item => (
          <li key={item.id} className="py-3 flex justify-between">
            <span className="text-lg">{item.name}</span>
            <span className="text-gray-600">Cantidad: {item.quantity}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => setCart([...cart, { id: 4, name: 'Teclado', quantity: 1 }])}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
      >
        Añadir Teclado al carrito
      </button>
    </div>
  );
};

export default CartApp;
