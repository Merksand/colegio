"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PersonaForm from "../components/PersonaForm";
import '../globals.css'
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

export default function Personas() {
    const [personas, setPersonas] = useState([]);
    const [error, setError] = useState(null);
    const [editingPersona, setEditingPersona] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        personaId: null,
        personaNombre: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const fetchPersonas = async () => {
        try {
            const response = await axios.get("/api/personas");
            setPersonas(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchPersonas();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    };

    // Funciones de manejo de eventos
    const handleEdit = (persona) => {
        setEditingPersona(persona);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDeleteClick = (persona) => {
        setDeleteConfirm({
            isOpen: true,
            personaId: persona.Id_Persona,
            personaNombre: `${persona.Nombre_Per} ${persona.Paterno_Per}`
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/personas/${deleteConfirm.personaId}`);
            setDeleteConfirm({ isOpen: false, personaId: null, personaNombre: null });
            fetchPersonas();
            showToast('Persona eliminada exitosamente');
        } catch (err) {
            showToast("Error al eliminar la persona", 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        
        try {
            if (editingPersona) {
                await axios.put(`/api/personas/${editingPersona.Id_Persona}`, data);
                setEditingPersona(null);
                showToast('Persona actualizada exitosamente');
            } else {
                await axios.post('/api/personas', data);
                setIsAdding(false);
                showToast('Persona agregada exitosamente');
            }
            fetchPersonas();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    const handleCancel = () => {
        setEditingPersona(null);
        setIsAdding(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-16'}`}>
                <div className="p-4">
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Personas</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-2">CI</th>
                                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                                        <th className="border border-gray-300 px-4 py-2">Ap. Paterno</th>
                                        <th className="border border-gray-300 px-4 py-2">Ap. Materno</th>
                                        <th className="border border-gray-300 px-4 py-2">Sexo</th>
                                        <th className="border border-gray-300 px-4 py-2">Dirección</th>
                                        <th className="border border-gray-300 px-4 py-2">Fecha Nac.</th>
                                        <th className="border border-gray-300 px-4 py-2">Lugar Nac.</th>
                                        <th className="border border-gray-300 px-4 py-2">Correo</th>
                                        <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                                        <th className="border border-gray-300 px-4 py-2">Estado</th>
                                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {personas && personas.length > 0 ? (
                                        personas.map((persona) => (
                                            <tr key={persona.Id_Persona} className="hover:bg-gray-50">
                                                <td className="border border-gray-300 px-4 py-2">{persona.CI_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Nombre_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Paterno_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Materno_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Sexo_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Direccion_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{formatDate(persona.FDN_Per)}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.LDN_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Correo_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">{persona.Telefono_Per}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <span className={`px-2 py-1 rounded-full text-sm ${
                                                        persona.Estado_Per === 'Activo' 
                                                        ? 'bg-green-200 text-green-800' 
                                                        : 'bg-red-200 text-red-800'
                                                    }`}>
                                                        {persona.Estado_Per}
                                                    </span>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <div className="flex gap-2 justify-center">
                                                        <button 
                                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                            onClick={() => handleEdit(persona)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button 
                                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                            onClick={() => handleDeleteClick(persona)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="12" className="border border-gray-300 px-4 py-2 text-center">
                                                No hay personas registradas
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button 
                            onClick={handleAdd}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Agregar Nueva Persona
                        </button>
                    </div>
                </div>

                {(editingPersona || isAdding) && (
                    <PersonaForm
                        persona={editingPersona}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}

                <ConfirmDialog
                    isOpen={deleteConfirm.isOpen}
                    onClose={() => setDeleteConfirm({ isOpen: false, personaId: null, personaNombre: null })}
                    onConfirm={handleDelete}
                    title="Confirmar Eliminación"
                    message={`¿Está seguro que desea eliminar a ${deleteConfirm.personaNombre}? Esta acción no se puede deshacer.`}
                />

                {toast.show && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast({ show: false, message: '', type: 'success' })}
                    />
                )}
            </main>
        </div>
    );
}
