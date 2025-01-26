"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";
import FuncionarioUniversidadForm from "@/components/FuncionarioUniversidadForm";

export default function FuncionarioUniversidadPage() {
    const [funcionarioUniversidades, setFuncionarioUniversidades] = useState([]);
    const [error, setError] = useState(null);
    const [editingFU, setEditingFU] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        fuId: null,
        fuName: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    // Obtener todas las relaciones de la tabla
    const fetchFuncionarioUniversidades = async () => {
        try {
            const response = await axios.get("/api/funcionarioUniversidades");
            setFuncionarioUniversidades(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchFuncionarioUniversidades();
    }, []);

    // Manejar edición
    const handleEdit = (fu) => {
        setEditingFU(fu);
        setIsAdding(true);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleDeleteClick = (fu) => {
        setDeleteConfirm({
            isOpen: true,
            fuId: fu.Id_FuncionarioUniversidad,
            fuName: `Funcionario ID ${fu.Id_Funcionario_FU}, Universidad ID ${fu.Id_Universidad_FU}`
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/funcionarioUniversidades/${deleteConfirm.fuId}`);
            setDeleteConfirm({ isOpen: false, fuId: null, fuName: null });
            fetchFuncionarioUniversidades();
            showToast('Relación Funcionario-Universidad eliminada exitosamente');
        } catch (err) {
            showToast("Error al eliminar la relación", 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleSubmit = async (data) => {
        try {
            if (editingFU) {
                await axios.put(`/api/funcionarioUniversidades/${editingFU.Id_FuncionarioUniversidad}`, data);
                showToast('Relación Funcionario-Universidad actualizada exitosamente');
            } else {
                await axios.post('/api/funcionarioUniversidades', data);
                showToast('Relación Funcionario-Universidad agregada exitosamente');
            }
    
            setEditingFU(null);
            setIsAdding(false);
            fetchFuncionarioUniversidades(); 
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };
    

    // Manejar cancelación
    const handleCancel = () => {
        setEditingFU(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Funcionario-Universidad</h1>
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
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Funcionario</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Universidad</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Inicio</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Fin</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Observación</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionarioUniversidades && funcionarioUniversidades.length > 0 ? (
                                    funcionarioUniversidades.map((fu) => (
                                        <tr key={fu.Id_FuncionarioUniversidad} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{fu.Id_FuncionarioUniversidad}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fu.FuncionarioNombre + ' ' + fu.FuncionarioPaterno}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fu.UniversidadNombre}</td>
                                            <td className="border border-gray-300 px-3 py-1">{new Date(fu.Fecha_Ini_FU).toLocaleDateString()}</td>
                                            <td className="border border-gray-300 px-3 py-1">{new Date(fu.Fecha_Fin_FU).toLocaleDateString()}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fu.Observacion_FU}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(fu)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(fu)}
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
                <FuncionarioUniversidadForm
                    funcionarioUniversidad={editingFU}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, fuId: null, fuName: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={<> ¿Está seguro que desea eliminar la relación entre <strong>{deleteConfirm.fuName}</strong> ? Esta acción no se puede deshacer. </>}
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
