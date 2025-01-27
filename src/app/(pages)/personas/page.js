"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PersonaForm from "@/components/PersonaForm";
import '@/app/globals.css'
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Personas() {
    const [personas, setPersonas] = useState([]);
    const [error, setError] = useState(null);
    const [editingPersona, setEditingPersona] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [filters, setFilters] = useState({ ci: "", paterno: "" });  
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
            console.log(err)
            showToast("Error en la operación", 'error');
        }
    };

    const handleCancel = () => {
        setEditingPersona(null);
        setIsAdding(false);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const filteredPersonas = personas.filter((persona) => {
        const matchesCI = filters.ci === "" || persona.CI_Per.includes(filters.ci);
        const matchesPaterno = filters.paterno === "" || persona.Paterno_Per.toLowerCase().includes(filters.paterno.toLowerCase());
        return matchesCI && matchesPaterno;
    });

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">

                <div className="overflow-x-auto bg-white rounded-lg shadow">

                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Personas</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="flex flex-col md:flex-row gap-2 p-4">
                            <input
                                type="number"
                                name="ci"
                                placeholder="Buscar por CI"
                                value={filters.ci}
                                onChange={handleFilterChange}
                                className="border rounded px-3 py-2"
                            />
                            <input
                                type="text"
                                name="paterno"
                                placeholder="Buscar por Ap. Paterno"
                                value={filters.paterno}
                                onChange={handleFilterChange}
                                className="border rounded px-3 py-2"
                            />
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Agregar Nueva Persona
                            </button>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">CI</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Nombre</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Ap. Paterno</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Ap. Materno</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Sexo</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Dirección</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Nac.</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Lugar Nac.</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Correo</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Teléfono</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPersonas && filteredPersonas.length > 0 ? (
                                    filteredPersonas.map((persona) => (
                                        <tr key={persona.Id_Persona} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{persona.CI_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Nombre_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Paterno_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Materno_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Sexo_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Direccion_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{formatDate(persona.FDN_Per)}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.LDN_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Correo_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{persona.Telefono_Per}</td>

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
                message={<>¿Desea eliminar la persona <strong>{deleteConfirm.personaNombre}</strong>?</>}
            />

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ show: false, message: '', type: 'success' })}
                />
            )}
        </div>
    );
}
