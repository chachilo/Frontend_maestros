import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Group } from '../types/Group'; // Importa el tipo Group

const GroupList = () => {
    const [groups, setGroups] = useState<Group[]>([]); // Especifica el tipo Group[]
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('https://backend-maestros.onrender.com/grupos');
                const data = await response.json();
                setGroups(data.grupos); // Asegúrate de que data.grupos sea un array de Group
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Lista de Grupos</h2>
                {groups.map((group) => (
                    <div key={group.id} className="mb-6 p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-xl font-semibold">{group.nombre}</h3>
                        <button
                            onClick={() => navigate(`/grupos/${group.id}`)}
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GroupList;