"use client";

import React, { useState } from 'react';

interface User {
    nombre: string;
    edad: number;
    esEstudiante: boolean;
    direccion: string;
    hobbies: string;
}

function AddUser() {
    const [user, setUser] = useState<User>({
        nombre: '',
        edad: 0,
        esEstudiante: false,
        direccion: '',
        hobbies: ''
    });

    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: name === "esEstudiante" ? (e.target as HTMLInputElement).checked : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch('http://localhost:5209/api/Usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el usuario');
            }
            return response.json();
        })
        .then(() => {  // Eliminamos 'data' aquí
            setMessage('Usuario agregado exitosamente');
            setUser({
                nombre: '',
                edad: 0,
                esEstudiante: false,
                direccion: '',
                hobbies: ''
            });
        })
        .catch(error => {
            console.error('Hubo un error al agregar el usuario', error);
            setError('Hubo un error al agregar el usuario');
        });
    };

    return (
        <div>
            <h2>Agregar Usuario</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={user.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Edad:</label>
                    <input
                        type="number"
                        name="edad"
                        value={user.edad}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Es Estudiante:</label>
                    <input
                        type="checkbox"
                        name="esEstudiante"
                        checked={user.esEstudiante}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Dirección:</label>
                    <input
                        type="text"
                        name="direccion"
                        value={user.direccion}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Hobbies:</label>
                    <textarea
                        name="hobbies"
                        value={user.hobbies}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Agregar Usuario</button>
            </form>
        </div>
    );
}

export default AddUser;
