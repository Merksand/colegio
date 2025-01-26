"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";
import FuncionarioColegioCargoForm from "@/components/FuncionarioColegioCargoForm";

export default function FuncionarioColegioCargoPage() {
    const [funcionarioColegios, setFuncionarioColegios] = useState([]);
    const [error, setError] = useState(null);
    const [editingFCC, setEditingFCC] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        fccId: null,
        fccName: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: '',
        type: 'success'
    });

    // Obtener todas las relaciones de la tabla
    const fetchFuncionarioColegios = async () => {
        try {
            const response = await axios.get("/api/funcionarioColegioCargo");
            setFuncionarioColegios(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchFuncionarioColegios();
    }, []);

    // Manejar edición
    const handleEdit = (fcc) => {
        setEditingFCC(fcc);
        setIsAdding(true);
    };

    // Manejar agregado
    const handleAdd = () => {
        setIsAdding(true);
    };

    // Manejar clic en eliminar
    const handleDeleteClick = (fcc) => {
        setDeleteConfirm({
            isOpen: true,
            fccId: fcc.Id_FCC,
            fccName: `Funcionario ID ${fcc.Id_Funcionario_FCC}, Colegio ID ${fcc.Id_Colegio_FCC}`
        });
    };

    // Manejar eliminación lógica
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/funcionarioColegios/${deleteConfirm.fccId}`);
            setDeleteConfirm({ isOpen: false, fccId: null, fccName: null });
            fetchFuncionarioColegios();
            showToast('Relación Funcionario-Colegio-Cargo eliminada exitosamente');
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
            if (editingFCC) {
                await axios.put(`/api/funcionarioColegios/${editingFCC.Id_FCC}`, data);
                setEditingFCC(null);
                showToast('Relación Funcionario-Colegio-Cargo actualizada exitosamente');
            } else {
                await axios.post('/api/funcionarioColegios', data);
                setIsAdding(false);
                showToast('Relación Funcionario-Colegio-Cargo agregada exitosamente');
            }
            fetchFuncionarioColegios();
        } catch (err) {
            showToast("Error en la operación", 'error');
        }
    };

    // Manejar cancelación
    const handleCancel = () => {
        setEditingFCC(null);
        setIsAdding(false);
    };

    return (
        <div className="flex w-full bg-gray-100 rounded-lg">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Funcionario-Colegio-Cargo</h1>
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
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Colegio</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Cargo</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Inicio</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Fecha Fin</th>
                                    <th className="border border-gray-300 px-3 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {funcionarioColegios && funcionarioColegios.length > 0 ? (
                                    funcionarioColegios.map((fcc) => (
                                        <tr key={fcc.Id_FCC} className="hover:bg-gray-50">
                                            <td className="border border-gray-300 px-3 py-1">{fcc.Id_FCC}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fcc.FuncionarioNombre}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fcc.ColegioNombre}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fcc.CargoNombre}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fcc.Fec_Inicio_FCC}</td>
                                            <td className="border border-gray-300 px-3 py-1">{fcc.Fec_Fin_FCC}</td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex gap-2 justify-center">
                                                    <button
                                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
                                                        onClick={() => handleEdit(fcc)}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-sm flex items-center gap-1"
                                                        onClick={() => handleDeleteClick(fcc)}
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
                <FuncionarioColegioCargoForm
                    funcionarioColegio={editingFCC}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, fccId: null, fccName: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar la relación entre ${deleteConfirm.fccName}? Esta acción no se puede deshacer.`}
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
