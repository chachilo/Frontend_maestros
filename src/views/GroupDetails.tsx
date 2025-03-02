import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Group, Student } from '../types/Group'; // Importa los tipos Group y Student

const GroupDetails = () => {
    const { id } = useParams(); // Obtén el ID del grupo desde la URL
    const [group, setGroup] = useState<Group | null>(null); // Especifica el tipo Group | null
    const [students, setStudents] = useState<Student[]>([]); // Especifica el tipo Student[]
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                // Obtener los detalles del grupo
                const groupResponse = await fetch(`http://localhost:5000/grupos/${id}`);
                const groupData = await groupResponse.json();
                setGroup(groupData.grupo);

                // Obtener los alumnos del grupo
                const studentsResponse = await fetch(`http://localhost:5000/grupos/${id}/alumnos`);
                const studentsData = await studentsResponse.json();
                setStudents(studentsData.alumnos);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchGroupDetails();
    }, [id]);

    if (!group) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Detalles del Grupo: {group.nombre}</h2>
                <h3 className="text-xl font-semibold mb-4">Alumnos:</h3>
                <ul className="space-y-2">
                    {students.map((student) => (
                        <li key={student.id} className="bg-gray-100 p-2 rounded-md">
                            {student.numero_control} - {student.nombre}
                        </li>
                    ))}
                </ul>
                <div className="mt-4 space-x-2">
                    <button
                        onClick={() => navigate('/view-groups')}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Volver a la Lista de Grupos
                    </button>
                    <button
                        onClick={() => navigate(`/grupos/${id}/asistencia`)} // Redirige a la ventana de asistencia
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Tomar Asistencia
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupDetails;