"use client";

import React, { useReducer } from "react";

// Se define primero

type State = { Boton: "encendido" | "apagado" };
type Action = { type: "encendido" } | { type: "apagado" };

// Desarrollamos la funcion

function Reducer(state: State, action: Action): State {
  switch (action.type) {
    case "encendido":
      return { Boton: "encendido" };
    case "apagado":
      return { Boton: "apagado" };
    default:
      throw new Error("Opción no definida");
  }
}

const Toggle: React.FC = () => {
  const [state, dispatch] = useReducer(Reducer, { Boton: "apagado" });

  return (
    <>
      <head>
        <title>Toggling</title>
      </head>
      <div
        className={`h-screen flex items-center justify-center ${
          state.Boton === "encendido" ? "bg-white" : "bg-black"
        }`}
      >
        <div className="text-center">
          <p
            className={`text-2xl mb-4 ${
              state.Boton === "encendido" ? "text-black" : "text-white"
            }`}
          >
            El botón está: {state.Boton}
          </p>
          <button
            onClick={() => dispatch({ type: "encendido" })}
            className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-700"
          >
            Encender
          </button>
          <button
            onClick={() => dispatch({ type: "apagado" })}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Apagar
          </button>
        </div>
      </div>
    </>
  );
};

export default Toggle;
