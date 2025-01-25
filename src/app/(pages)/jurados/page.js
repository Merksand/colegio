"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import JuradoForm from "@/components/JuradoForm";
import '@/app/globals.css'
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Jurados() {
    const [jurados, setJurados] = useState([]);
    const [error, setError] = useState(null);
    const [editingJurado, setEditingJurado] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        juradoId: null,
        juradoNombre: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const fetchJurados = async () => {
        try {
            const response = await axios.get("/api/jurados");
            setJurados(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchJurados();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES');
    };

    const handleEdit = (jurado) => {
        setEditingJurado(jurado);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDeleteClick = (jurado) => {
        setDeleteConfirm({
            isOpen: true,
            juradoId: jurado.Id_Jurado,
            juradoNombre: `${jurado.Nombre_Jur} ${jurado.Paterno_Jur}`
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/jurados/${deleteConfirm.juradoId}`);
            setDeleteConfirm({ isOpen: false, juradoId: null, juradoNombre: null });
            fetchJurados();
            showToast('Jurado eliminado exitosamente');
        } catch (err) {
            showToast("Error al eliminar el jurado", 'error');
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
        console.log(data)
        try {
            if (editingJurado) {
                await axios.put(`/api/jurados/${editingJurado.Id_Jurado}`, data);
                setEditingJurado(null);
                showToast('Jurado actualizado exitosamente');
            } else {
                await axios.post('/api/jurados', data);
                setIsAdding(false);
                showToast('Jurado agregado exitosamente');
            }
            fetchJurados();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    const handleCancel = () => {
        setEditingJurado(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Jurados</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="mt-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Agregar Nuevo Jurado
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
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Nac.</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Correo</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Teléfono</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Departamento</th>

                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jurados && jurados.length > 0 ? (
                                    jurados.map((jurado) => (
                                        <tr key={jurado.Id_Jurado} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{jurado.CI_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Nombre_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Paterno_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Materno_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Sexo_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{formatDate(jurado.FDN_Per)}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Correo_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.Telefono_Per}</td>
                                            <td className="border border-gray-300 px-3 py-1">{jurado.LDN_Per}</td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(jurado)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(jurado)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="border border-gray-300 px-4 py-2 text-center">
                                            No hay jurados registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {(editingJurado || isAdding) && (
                <JuradoForm
                    jurado={editingJurado}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, juradoId: null, juradoNombre: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar a ${deleteConfirm.juradoNombre}? Esta acción no se puede deshacer.`}
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
