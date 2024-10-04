"use client";

import React, { useState, useMemo } from 'react';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<number>(0);
  const [num2, setNum2] = useState<number>(0);
  const [operation, setOperation] = useState<string>('sum');

  const result = useMemo(() => {
    console.log('Calculando resultado...');
    switch (operation) {
      case 'sum':
        return num1 + num2;
      case 'subtract':
        return num1 - num2;
      case 'multiply':
        return num1 * num2;
      case 'divide':
        return num2 !== 0 ? num1 / num2 : 'División por 0 no permitida';
      default:
        return 0;
    }
  }, [num1, num2, operation]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Calculadora</h1>

      <div className="mb-4">
        <label className="block text-lg font-medium">Número 1:</label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">Número 2:</label>
        <input
          type="number"
          value={num2}
          onChange={(e) => setNum2(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-lg font-medium">Operación:</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="sum">Suma</option>
          <option value="subtract">Resta</option>
          <option value="multiply">Multiplicación</option>
          <option value="divide">División</option>
        </select>
      </div>

      <div className="text-2xl font-bold mt-4">
        Resultado: {result}
      </div>
    </div>
  );
};

export default Calculator;
