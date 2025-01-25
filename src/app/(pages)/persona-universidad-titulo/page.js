"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import RelacionForm from "@/components/RelacionForm";
import "@/app/globals.css";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function RelacionesPage() {
    const [relaciones, setRelaciones] = useState([]);
    const [error, setError] = useState(null);
    const [editingRelacion, setEditingRelacion] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        relacionId: null,
        personaNombre: null
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success"
    });

    const fetchRelaciones = async () => {
        try {
            const response = await axios.get("/api/persona-universidad-titulo");
            setRelaciones(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchRelaciones();
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const handleEdit = (relacion) => {
        console.log(relacion)
        setEditingRelacion(relacion);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingRelacion(null);
        setIsAdding(false);
    };

    const handleDeleteClick = (relacion) => {
        setDeleteConfirm({
            isOpen: true,
            relacionId: relacion.Id_PUT,
            personaNombre: `${relacion.Nombre_Per} ${relacion.Paterno_Per}`
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/persona-universidad-titulo/${deleteConfirm.relacionId}`);
            setDeleteConfirm({ isOpen: false, relacionId: null, personaNombre: null });
            fetchRelaciones();
            showToast("Relación eliminada exitosamente");
        } catch (err) {
            showToast("Error al eliminar la relación", "error");
        }
    };

    const handleSubmit = async (formData) => {
        // console.log(formData)
        try {
            if (editingRelacion) {
                await axios.put(`/api/persona-universidad-titulo/${editingRelacion.Id_PUT}`, formData);
                setEditingRelacion(null);
                showToast("Relación actualizada exitosamente");
            } else {
                await axios.post("/api/persona-universidad-titulo", formData);
                setIsAdding(false);
                showToast("Relación agregada exitosamente");
            }
            fetchRelaciones();
        } catch (error) {
            console.error("Error:", error);
            showToast(
                error.response?.data?.error || "Error al procesar la solicitud",
                "error"
            );
        }
    };

    return (
        <div className="flex w-full bg-gray-100">
            <div className="p-4 w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className = "flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Relaciones Persona-Universidad-Título</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="p-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Agregar Relación
                            </button>
                        </div>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Persona</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Universidad</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Título</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Estado</th>
                                    <th className="border border-gray-300 px-4 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.map((relacion) => (
                                    <tr key={relacion.Id_PUT} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">
                                            {`${relacion.Nombre_Per} ${relacion.Paterno_Per} ${relacion.Materno_Per}`}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">{relacion.Nombre_Uni}</td>
                                        <td className="border border-gray-300 px-4 py-2">{relacion.Descripcion_Tit}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span className={`px-2 py-1 rounded-full text-sm ${relacion.Estado_PUT === "Activo"
                                                ? "bg-green-200 text-green-800"
                                                : "bg-red-200 text-red-800"
                                                }`}>
                                                {relacion.Estado_PUT}
                                            </span>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(relacion)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(relacion)}
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

            {(editingRelacion || isAdding) && (
                <RelacionForm
                    relacion={editingRelacion}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            )}

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, relacionId: null, personaNombre: null })}
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={`¿Está seguro que desea eliminar la relación de ${deleteConfirm.personaNombre}?`}
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