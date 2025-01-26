"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";
import JuradoColegioForm from "@/components/JuradoColegioForm";

export default function JuradoColegioPage() {
    const [juradoColegios, setJuradoColegios] = useState([]);
    const [error, setError] = useState(null);
    const [editingJuradoColegio, setEditingJuradoColegio] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        juradoColegioId: null,
        juradoColegioName: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    const fetchJuradoColegios = async () => {
        try {
            const response = await axios.get("/api/juradoColegios");
            setJuradoColegios(response.data);
            console.log(response)
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchJuradoColegios();
    }, []);

    const handleEdit = (juradoColegio) => {
        setEditingJuradoColegio(juradoColegio);
        setIsAdding(true);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDeleteClick = (juradoColegio) => {
        setDeleteConfirm({
            isOpen: true,
            juradoColegioId: juradoColegio.Id_JuradoColegio,
            juradoColegioName: `Jurado ID ${juradoColegio.Id_Jurado_JC}, Colegio ID ${juradoColegio.Id_Colegio_JC}`
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/juradoColegios/${deleteConfirm.juradoColegioId}`);
            setDeleteConfirm({ isOpen: false, juradoColegioId: null, juradoColegioName: null });
            fetchJuradoColegios();
            showToast('Relación Jurado-Colegio eliminada exitosamente');
        } catch (err) {
            showToast("Error al eliminar la relación", 'error');
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
        // console.log(formData)
        // console.log(data)

        try {
            if (editingJuradoColegio) {
                await axios.put(`/api/juradoColegios/${editingJuradoColegio.Id_JuradoColegio}`, data);
                setEditingJuradoColegio(null);
                showToast('Relación Jurado-Colegio actualizada exitosamente');
            } else {
                await axios.post('/api/juradoColegios', data);
                setIsAdding(false);
                showToast('Relación Jurado-Colegio agregada exitosamente');
            }
            fetchJuradoColegios();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    const handleCancel = () => {
        setEditingJuradoColegio(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Jurado-Colegios</h1>
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
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Jurado</th>
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Colegio</th>
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Fecha Inicio</th>
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Fecha Fin</th>
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Observación</th>
                                    <th className="border border-gray-300 px-3 py-2 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {juradoColegios && juradoColegios.length > 0 ? (
                                    juradoColegios.map((juradoColegio) => (
                                        <tr key={juradoColegio.Id_JuradoColegio} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{juradoColegio.NombreJurado + " " + juradoColegio.JuradoPaterno}</td>
                                            <td className="border border-gray-300 px-3 py-1">{juradoColegio.NombreColegio}</td>
                                            <td className="border border-gray-300 px-3 py-1">{new Date(juradoColegio.Fecha_Ini_JC).toLocaleDateString()}</td>
                                            <td className="border border-gray-300 px-3 py-1">{new Date(juradoColegio.Fecha_Fin_JC).toLocaleDateString()}</td>
                                            <td className="border border-gray-300 px-3 py-1">{juradoColegio.Observacion_JC}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(juradoColegio)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(juradoColegio)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="border border-gray-300 px-4 py-2 text-center">
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
                <JuradoColegioForm
                    juradoColegio={editingJuradoColegio}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, juradoColegioId: null, juradoColegioName: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar la relación entre ${deleteConfirm.juradoColegioName}? Esta acción no se puede deshacer.`}
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
