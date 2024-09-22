"use client";

import Link from "next/link";
import React, { useState } from "react";

interface User {
  nombre: string;
  edad: number;
  esEstudiante: boolean;
  direccion: string;
  hobbies: string;
}

function AddUser() {
  const [user, setUser] = useState<User>({
    nombre: "",
    edad: 0,
    esEstudiante: false,
    direccion: "",
    hobbies: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]:
        name === "esEstudiante"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:5209/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.error);
          });
        }
        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
        setUser({
          nombre: "",
          edad: 0,
          esEstudiante: false,
          direccion: "",
          hobbies: "",
        });
      })
      .catch((error) => {
        console.error("Hubo un error al agregar el usuario", error);
        setError(error.message);
      });
  };

  return (
    <>
    <head>
      <title>Agregar Usuario</title>
    </head>
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Agregar Usuario</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={user.nombre}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Edad:</label>
          <input
            type="number"
            name="edad"
            value={user.edad}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium mr-2">
            Es Estudiante:
          </label>
          <input
            type="checkbox"
            name="esEstudiante"
            checked={user.esEstudiante}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={user.direccion}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Hobbies:</label>
          <textarea
            name="hobbies"
            value={user.hobbies}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Agregar Usuario
        </button>
        <br />
        <Link
          href="/"
          className="inline-block text-center w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Regresar al Inicio
        </Link>
      </form>
    </div>
    </>
  );
}

export default AddUser;
