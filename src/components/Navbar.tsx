import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md rounded-lg p-4 flex justify-center space-x-4 mb-6">
            <button 
                onClick={() => navigate('/dashboard')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Inicio
            </button>
            <button 
                onClick={() => navigate('/create-group')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Crear Grupo
            </button>
            <button 
                onClick={() => navigate('/add-student')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Agregar Alumno
            </button>
            <button 
                onClick={() => navigate('/view-groups')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Ver Grupos
            </button>
            <button 
                onClick={() => navigate('/cv-form')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Agregar CV
            </button>
            <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
                Cerrar Sesión
            </button>
        </nav>
    );
};

export default Navbar;