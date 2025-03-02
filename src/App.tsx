import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CVForm from './components/CVForm';
import Dashboard from './components/Dashboard';
import GroupForm from './components/GroupForm';
import AddStudentForm from './components/AddStudentForm';
import GroupList from './components/GroupList';
import GroupDetails from './views/GroupDetails'; // Importa el nuevo componente
import AttendanceView from './components/AttendanceView';
import { GroupProvider } from './context/GroupContext';

function App() {
    return (
        <GroupProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/cv-form" element={<CVForm />} />
                    <Route path="/create-group" element={<GroupForm />} />
                    <Route path="/add-student" element={<AddStudentForm />} />
                    <Route path="/view-groups" element={<GroupList />} />
                    <Route path="/grupos/:id" element={<GroupDetails />} /> {/* Nueva ruta */}
                    <Route path="/grupos/:id/asistencia" element={<AttendanceView />} />
                </Routes>
            </Router>
        </GroupProvider>
    );
}

export default App;