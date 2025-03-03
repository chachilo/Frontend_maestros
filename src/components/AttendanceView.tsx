import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Student {
  id: string;
  nombre: string;
  numero_control: string;
}

const AttendanceView = () => {
  const { id } = useParams(); // ID del grupo
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({}); // Estado para la asistencia
  const navigate = useNavigate();

  // Obtener los alumnos del grupo
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/grupos/${id}/alumnos`);
        const data = await response.json();
        setStudents(data.alumnos);
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener los alumnos.');
      }
    };

    fetchStudents();
  }, [id]);

  // Ordenar alumnos alfabéticamente
  const sortedStudents = students.sort((a, b) => a.nombre.localeCompare(b.nombre));

  // Manejar cambios en la asistencia
  const handleAttendanceChange = (studentId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId], // Cambia el estado de asistencia
    }));
  };

  // Guardar la asistencia
  const saveAttendance = async () => {
    try {
      const response = await fetch('http://localhost:5000/guardar-asistencia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grupo_id: id,
          fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
          asistencia: attendance,
        }),
      });

      if (response.ok) {
        alert('Asistencia guardada correctamente.');
        navigate(`/grupos/${id}`); // Redirige a la vista de detalles del grupo
      } else {
        alert('Error al guardar la asistencia.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Asistencia del Grupo</h2>
        <h3 className="text-xl font-semibold mb-4">Fecha: {new Date().toLocaleDateString()}</h3>
        <ul className="space-y-2">
          {sortedStudents.map((student) => (
            <li key={student.id} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <span>
                {student.nombre} - {student.numero_control}
              </span>
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => handleAttendanceChange(student.id)}
                className="ml-4"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={saveAttendance}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Guardar Asistencia
        </button>
      </div>
    </div>
  );
};

export default AttendanceView;
