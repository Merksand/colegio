"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import RelacionForm from "../components/RelacionForm";
import "../globals.css";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (editingRelacion) {
                await axios.put(`/api/persona-universidad-titulo/${editingRelacion.Id_PUT}`, data);
                setEditingRelacion(null);
                showToast("Relación actualizada exitosamente");
            } else {
                await axios.post("/api/persona-universidad-titulo", data);
                setIsAdding(false);
                showToast("Relación agregada exitosamente");
            }
            fetchRelaciones();
        } catch (err) {
            showToast("Error en la operación", "error");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-16"}`}>
                <div className="p-4">
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <h1 className="text-2xl font-bold mb-4 p-4">Relaciones Persona-Universidad-Título</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">Persona</th>
                                        <th className="px-4 py-2">Universidad</th>
                                        <th className="px-4 py-2">Título</th>
                                        <th className="px-4 py-2">Estado</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relaciones.map((relacion) => (
                                        <tr key={relacion.Id_PUT} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                {`${relacion.Nombre_Per} ${relacion.Paterno_Per} ${relacion.Materno_Per}`}
                                            </td>
                                            <td className="px-4 py-2">{relacion.Nombre_Uni}</td>
                                            <td className="px-4 py-2">{relacion.Descripcion_Tit}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    relacion.Estado_Put === "Activo"
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}>
                                                    {relacion.Estado_Put}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
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
                        <div className="p-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Agregar Relación
                            </button>
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
            </main>
        </div>
    );
} 