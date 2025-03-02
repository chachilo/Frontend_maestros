import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const GroupForm = () => {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (groupName.trim() === '') {
            alert('El nombre del grupo es obligatorio.');
            return;
        }

        try {
            const response = await fetch('https://backend-maestros.onrender.com/crear-grupo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre: groupName }),
            });

            if (response.ok) {
                alert('Grupo creado correctamente.');
                setGroupName('');
                navigate('/view-groups');
            } else {
                alert('Error al crear el grupo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Crear Nuevo Grupo</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre del Grupo:</label>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Ej: 1A - TI"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Crear Grupo
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GroupForm;