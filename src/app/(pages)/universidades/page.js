"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import UniversidadForm from "@/components/UniversidadForm";
import "@/app/globals.css";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Universidades() {
    const [universidades, setUniversidades] = useState([]);
    const [error, setError] = useState(null);
    const [editingUniversidad, setEditingUniversidad] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        universidadId: null,
        universidadNombre: null,
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const fetchUniversidades = async () => {
        try {
            const response = await axios.get("/api/universidades");
            setUniversidades(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchUniversidades();
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const handleEdit = (universidad) => {
        setEditingUniversidad(universidad);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingUniversidad(null);
        setIsAdding(false);
    };

    const handleDeleteClick = (universidad) => {
        setDeleteConfirm({
            isOpen: true,
            universidadId: universidad.Id_Universidad,
            universidadNombre: universidad.Nombre_Uni,
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/universidades/${deleteConfirm.universidadId}`);
            setDeleteConfirm({ isOpen: false, universidadId: null, universidadNombre: null });
            fetchUniversidades();
            showToast("Universidad eliminada exitosamente");
        } catch (err) {
            showToast("Error al eliminar la universidad", "error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (editingUniversidad) {
                await axios.put(`/api/universidades/${editingUniversidad.Id_Universidad}`, data);
                setEditingUniversidad(null);
                showToast("Universidad actualizada exitosamente");
            } else {
                await axios.post("/api/universidades", data);
                setIsAdding(false);
                showToast("Universidad agregada exitosamente");
            }
            fetchUniversidades();
        } catch (err) {
            showToast("Error en la operación", "error");
        }
    };

    return (
        <div className="flex w-full bg-gray-100">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Universidades</h1>
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
                        >
                            Agregar Nueva Universidad
                        </button>
                    </div>
                    {error && <p className="text-red-500 px-4">{error}</p>}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left ">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Nombre</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Tipo</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Sede</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Estado</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {universidades.map((universidad) => (
                                    <tr key={universidad.Id_Universidad} className="border-b hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{universidad.Nombre_Uni}</td>
                                        <td className="border border-gray-300 px-4 py-2">{universidad.Tipo_Uni}</td>
                                        <td className="border border-gray-300 px-4 py-2">{universidad.Sede_Uni}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${universidad.Estado_Uni === "Activo"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-red-200 text-red-800"
                                                }`}>
                                                {universidad.Estado_Uni}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(universidad)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(universidad)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {(editingUniversidad || isAdding) && (
                <UniversidadForm
                    universidad={editingUniversidad}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, universidadId: null, universidadNombre: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={<>¿Está seguro que desea eliminar la universidad <strong>{deleteConfirm.universidadNombre}</strong>?</>}
            />

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ show: false, message: "", type: "success" })}
                />
            )}
        </div>
    );
} 