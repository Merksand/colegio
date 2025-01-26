"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";
import PUTJuradoForm from "@/components/PUTJuradoForm";

export default function PUTJuradoPage() {
    const [putJurados, setPutJurados] = useState([]);
    const [error, setError] = useState(null);
    const [editingPUTJurado, setEditingPUTJurado] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        putJuradoId: null,
        putJuradoName: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    // Obtener todas las relaciones de la tabla
    const fetchPUTJurados = async () => {
        try {
            const response = await axios.get("/api/putJurados");
            setPutJurados(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchPUTJurados();
    }, []);

    // Manejar edición
    const handleEdit = (putJurado) => {
        setEditingPUTJurado(putJurado);
        setIsAdding(true);
    };

    // Manejar agregado
    const handleAdd = () => {
        setIsAdding(true);
    };

    // Manejar clic en eliminar
    const handleDeleteClick = (putJurado) => {
        setDeleteConfirm({
            isOpen: true,
            putJuradoId: putJurado.Id_PUT_Jurado,
            putJuradoName: `Jurados para PUT ID ${putJurado.Id_PUT_Jur}`
        });
    };

    // Manejar eliminación lógica
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/putJurados/${deleteConfirm.putJuradoId}`);
            setDeleteConfirm({ isOpen: false, putJuradoId: null, putJuradoName: null });
            fetchPUTJurados();
            showToast('Relación PUT-Jurado eliminada exitosamente');
        } catch (err) {
            showToast("Error al eliminar la relación", 'error');
        }
    };

    // Mostrar notificación
    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    // Manejar envío de formulario
    const handleSubmit = async (data) => {
        try {
            if (editingPUTJurado) {
                await axios.put(`/api/putJurados/${editingPUTJurado.Id_PUT_Jurado}`, data);
                showToast('Relación PUT-Jurado actualizada exitosamente');
            } else {
                await axios.post('/api/putJurados', data);
                showToast('Relación PUT-Jurado agregada exitosamente');
            }

            // Restablecer estados y actualizar lista
            setEditingPUTJurado(null);
            setIsAdding(false);
            fetchPUTJurados();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    // Manejar cancelación
    const handleCancel = () => {
        setEditingPUTJurado(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de PUT-Jurado</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="mt-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                            >
                                Agregar Nueva Relación
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left table-auto">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">ID</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">PUT</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Jurado</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Representante</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Observaciones</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {putJurados && putJurados.length > 0 ? (
                                    putJurados.map((putJurado) => (
                                        <tr key={putJurado.Id_PUT_Jurado} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{putJurado.Id_PUT_Jurado}</td>
                                            <td className="border border-gray-300 px-3 py-1">{putJurado.Id_PUT_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{putJurado.JuradoNombre}</td>
                                            <td className="border border-gray-300 px-3 py-1">{putJurado.Representante_Jur}</td>
                                            <td className="border border-gray-300 px-3 py-1">{putJurado.Observacion_Jur}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(putJurado)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(putJurado)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center">
                                            No hay relaciones registradas
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isAdding && (
                <PUTJuradoForm
                    putJurado={editingPUTJurado}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, putJuradoId: null, putJuradoName: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={<> ¿Está seguro que desea eliminar la relación <strong>{deleteConfirm.putJuradoName}</strong>? Esta acción no se puede deshacer. </>}
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
