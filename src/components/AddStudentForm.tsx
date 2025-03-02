import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Group {
  id: string;
  nombre: string;
}

const StudentForm = () => {
  const { id } = useParams(); // id del grupo actual
  const [nombre, setNombre] = useState('');
  const [numeroControl, setNumeroControl] = useState('');
  const [grupos, setGrupos] = useState<Group[]>([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(''); // Nuevo estado para el grupo seleccionado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await fetch('https://backend-maestros.onrender.com/grupos');
        const data = await response.json();
        setGrupos(data.grupos);
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener los grupos.');
      }
    };

    fetchGrupos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/agregar-alumno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grupo_id: grupoSeleccionado, nombre, numero_control: numeroControl }),
      });

      if (response.ok) {
        alert('Alumno agregado correctamente.');
        setNombre('');
        setNumeroControl('');
        // Redirige a la vista de detalles del grupo seleccionado
        navigate(`/grupos/${grupoSeleccionado}`); // Asegúrate de que esta ruta coincida con la de GroupDetails
      } else {
        alert('Error al agregar el alumno.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Agregar Alumno</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Grupo:</label>
            <select
              value={grupoSeleccionado}
              onChange={(e) => setGrupoSeleccionado(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Selecciona un grupo</option>
              {grupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre del Alumno:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del alumno"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Número de Control:</label>
            <input
              type="text"
              value={numeroControl}
              onChange={(e) => setNumeroControl(e.target.value)}
              placeholder="Número de control"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Agregar Alumno
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;