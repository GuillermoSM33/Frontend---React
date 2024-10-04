"use client";

import React, { useCallback, useState } from "react";

const data = [
  { id: 1, name: "Samira" },
  { id: 2, name: "Jax" },
  { id: 3, name: "Miss Fortune" },
  { id: 4, name: "Fiora" },
];

const SearchApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterList, setFilterList] = useState(data);

  const handlerSearch = useCallback(() => {
    const filter = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterList(filter);
  }, [searchTerm]);

  return (
    <>
      <head>
        <title>Buscador</title>
      </head>
      <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">Buscador De Campeones</h1>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar Campeones"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        ></input>

        <button
          onClick={handlerSearch}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Buscar Campeón
        </button>

        <ul className="mt-4">
          {filterList.map((item) => (
            <li key={item.id} className="p-2 border-b border-gray-200">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SearchApp;
