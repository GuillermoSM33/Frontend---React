"use client";
import React, { useEffect, useReducer } from "react";
import Link from "next/link";

interface User {
  id: number;
  nombre: string;
  edad: number;
  esEstudiante: boolean;
  direccion: string;
  hobbies: string;
}

const initialState = {
  users: [] as User[],
  visibleCount: 1,
  error: null as string | null
};

function reducer(state: typeof initialState, action: any) {
  switch (action.type) {
    case "setUsers":
      return { ...state, users: action.payload, error: null };
    case "setVisibleCount":
      return { ...state, visibleCount: action.payload };
    case "setError":
      return { ...state, error: action.payload };
    default:
      throw new Error("Acción no soportada");
  }
}

function UserView() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:5209/api/Usuarios")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de usuarios");
        }
        return response.json();
      })
      .then((data: User[]) => dispatch({ type: "setUsers", payload: data }))
      .catch((error) => {
        console.error("Hubo un error al obtener la lista de usuarios", error);
        dispatch({ type: "setError", payload: "Hubo un error al obtener la lista de usuarios" });
      });
  }, []);

  if (state.error) {
    return <div className="text-red-600 font-semibold">{state.error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg bg-white">
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
          value={state.visibleCount}
          onChange={(e) => dispatch({ type: "setVisibleCount", payload: Number(e.target.value) })}
          min={1}
          max={state.users.length}
          className="w-20 text-center bg-gray-100 p-2 rounded-md shadow-sm"
        />
      </div>

      <ul className="space-y-6">
        {state.users.slice(0, state.visibleCount).map((user: User) => (
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
  );
}

export default UserView;
