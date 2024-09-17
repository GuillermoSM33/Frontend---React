"use client";

import React, { useEffect, useState } from 'react';

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
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5209/api/Usuarios')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de usuarios');
                }
                return response.json();
            })
            .then((data: User[]) => setUsers(data))
            .catch(error => {
                console.error('Hubo un error al obtener la lista de usuarios', error);
                setError('Hubo un error al obtener la lista de usuarios');
            });
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.nombre}</h2>
                        <p>Edad: {user.edad}</p>
                        <p>Es estudiante: {user.esEstudiante ? 'Sí' : 'No'}</p>
                        <p>Dirección: {user.direccion}</p>
                        <p>Hobbies: {user.hobbies}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserView;
