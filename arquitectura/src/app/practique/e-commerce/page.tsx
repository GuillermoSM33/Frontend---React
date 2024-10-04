"use client";

import React, { useState, useCallback } from "react";

const data = [
    { id: 1, name: 'Cartera'},
    { id: 2, name: 'Celular'},
    { id: 3, name: 'Laptop-Lenovo'},    
    { id: 4, name: 'Laptop-Asus'},
];

const Ecommerce: React.FC = () => {
    const [filterForProducts, setFilterForProducts] = useState(data);
    const [cart, setCart] = useState<any[]>([]);

    const filterProductsByName = (searchTerm: string) => {
        if (searchTerm.trim() === '') {
            setFilterForProducts(data);
        } else {
            setFilterForProducts(
                data.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    };

    const addToCart = (product: any) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id: number) => {
        setCart(cart.filter(product => product.id !== id));
    };

    return (
        <>
            <head>
                <title>Ecommerce</title>
            </head>
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Lista de Productos</h1>

                <input
                    type="text"
                    placeholder="Buscar producto..."
                    onChange={(e) => filterProductsByName(e.target.value)}
                    className="mb-6 w-full p-3 border border-gray-300 rounded-md text-lg"
                />

                <ul className="divide-y divide-gray-200">
                    {filterForProducts.length > 0 ? (
                        filterForProducts.map(product => (
                            <li
                                key={product.id}
                                className="p-4 flex justify-between items-center"
                            >
                                <span className="text-lg">{product.name}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-700"
                                >
                                    Añadir al carrito
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="p-4 text-center text-gray-500">No se encontraron productos</li>
                    )}
                </ul>

                <div className="mt-6">
                    <h2 className="text-2xl font-bold">Carrito de compras</h2>
                    {cart.length > 0 ? (
                        <ul className="mt-4 divide-y divide-gray-200">
                            {cart.map((product, index) => (
                                <li
                                    key={index}
                                    className="p-4 flex justify-between items-center"
                                >
                                    <span className="text-lg">{product.name}</span>
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-700"
                                    >
                                        Quitar del carrito
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-4 text-lg">El carrito está vacío</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Ecommerce;
