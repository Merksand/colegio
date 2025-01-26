"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ColegioForm from "@/components/ColegioForm";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Colegios() {
    const [colegios, setColegios] = useState([]);
    const [error, setError] = useState(null);
    const [editingColegio, setEditingColegio] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        colegioId: null,
        colegioNombre: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const fetchColegios = async () => {
        try {
            const response = await axios.get("/api/colegios");
            setColegios(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchColegios();
    }, []);

    const handleEdit = (colegio) => {
        setEditingColegio(colegio);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDeleteClick = (colegio) => {
        setDeleteConfirm({
            isOpen: true,
            colegioId: colegio.Id_Colegio,
            colegioNombre: colegio.Nombre_Col
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/colegios/${deleteConfirm.colegioId}`);
            setDeleteConfirm({ isOpen: false, colegioId: null, colegioNombre: null });
            fetchColegios();
            showToast('Colegio eliminado exitosamente');
        } catch (err) {
            showToast("Error al eliminar el colegio", 'error');
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
            if (editingColegio) {
                await axios.put(`/api/colegios/${editingColegio.Id_Colegio}`, data);
                setEditingColegio(null);
                showToast('Colegio actualizado exitosamente');
            } else {
                await axios.post('/api/colegios', data);
                setIsAdding(false);
                showToast('Colegio agregado exitosamente');
            }
            fetchColegios();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    const handleCancel = () => {
        setEditingColegio(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Colegios</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="mt-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Agregar Nuevo Colegio
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">ID</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Nombre</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colegios && colegios.length > 0 ? (
                                    colegios.map((colegio) => (
                                        <tr key={colegio.Id_Colegio} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{colegio.Id_Colegio}</td>
                                            <td className="border border-gray-300 px-3 py-1">{colegio.Nombre_Col}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(colegio)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(colegio)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">
                                            No hay colegios registrados
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {(editingColegio || isAdding) && (
                <ColegioForm
                    colegio={editingColegio}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, colegioId: null, colegioNombre: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={<>¿Está seguro que desea eliminar a <strong>{deleteConfirm.colegioNombre}</strong> ? Esta acción no se puede deshacer.</>}
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
