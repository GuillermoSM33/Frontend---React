"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  id: number;
  nombre: string;
  edad: number;
  esEstudiante: boolean;
  direccion: string;
  hobbies: string;
}

function UserView() {
  const [users, setUsers] = useState<User[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5209/api/Usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de usuarios");
        }
        return response.json();
      })
      .then((data: User[]) => setUsers(data))
      .catch((error) => {
        console.error("Hubo un error al obtener la lista de usuarios", error);
        setError("Hubo un error al obtener la lista de usuarios");
      });
  }, []);

  if (error) {
    return <div className="text-red-600 font-semibold">{error}</div>;
  }

  return (
    <>
    <head>
      <title>Usuarios Registrados</title>
    </head>
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Usuarios Registrados
      </h1>

      <div className="mb-6 text-center">
        <label
          htmlFor="userCount"
          className="block text-gray-700 font-medium mb-2"
        >
          Número de usuarios a mostrar:
        </label>
        <input
          id="userCount"
          type="number"
          value={visibleCount}
          onChange={(e) => setVisibleCount(Number(e.target.value))}
          min={1}
          max={users.length}
          className="w-20 text-center bg-gray-100 p-2 rounded-md shadow-sm"
        />
      </div>

      <ul className="space-y-6">
        {users.slice(0, visibleCount).map((user) => (
          <li key={user.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-bold text-indigo-700">{user.nombre}</h2>
            <p className="text-gray-600">
              Edad: <span className="font-medium">{user.edad}</span>
            </p>
            <p className="text-gray-600">
              Es estudiante:{" "}
              <span className="font-medium">
                {user.esEstudiante ? "Sí" : "No"}
              </span>
            </p>
            <p className="text-gray-600">
              Dirección: <span className="font-medium">{user.direccion}</span>
            </p>
            <p className="text-gray-600">
              Hobbies: <span className="font-medium">{user.hobbies}</span>
            </p>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="inline-block text-center w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Regresar al Inicio
      </Link>
    </div>
    </>
  );
}

export default UserView;
