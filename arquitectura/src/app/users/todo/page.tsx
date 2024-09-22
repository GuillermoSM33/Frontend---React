"use client";

import React, { useReducer, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';

interface ITask{
    id: any;
    text: string;
    completed: boolean;
}

// Define the initial state
const initialState: ITask[] = [];

// Define the reducer function
const todoReducer = (state: ITask[], action: any) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [...state, action.payload];
        case 'TOGGLE_TASK':
            return state.map(task =>
                task.id === action.payload ? { ...task, completed: !task.completed } : task
            );
        case 'DELETE_TASK':
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
};

const ToDo = () => {
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodo, setNewTodo] = useState('');

    const add = useCallback(() => {
        if (newTodo.trim() === '') return;
        dispatch({ type: 'ADD_TASK', payload: { id: Date.now(), text: newTodo, completed: false } });
        setNewTodo('');
    }, [newTodo]);

    const completedCount = useMemo(() => {
        return state.filter(task => task.completed).length;
    }, [state]);

    return (
        <>
            <head>
                <title>ToDo List</title>
            </head>

            <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    placeholder="Agregar una nueva tarea"
                />
                <button
                    onClick={add}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Agregar
                </button>
                <p className="text-2xl font-bold mb-4 mt-4">Tareas Completadas: {completedCount}</p>
                <ul className="mt-4">
                    {state.map(task => (
                        <li key={task.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
                                    className="mr-2"
                                />
                                <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                            </div>
                            <button
                                onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
                                className="text-red-600 hover:text-red-800"
                            >
                                Delete
                            </button>
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
};

export default ToDo;


