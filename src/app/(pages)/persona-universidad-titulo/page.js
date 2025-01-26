"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import RelacionForm from "@/components/RelacionForm";
import "@/app/globals.css";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function RelacionesPage() {
    const [relaciones, setRelaciones] = useState([]);
    const [listas, setListas] = useState({
        personas: [],
        universidades: [],
        titulos: [],
    });
    const [error, setError] = useState(null);
    const [editingRelacion, setEditingRelacion] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        relacionId: null,
        personaNombre: null,
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    // Obtener relaciones y listas
    const fetchRelacionesYListas = async () => {
        try {
            const response = await axios.get("/api/persona-universidad-titulo");
            const { relaciones, listas } = response.data;

            setRelaciones(relaciones || []);
            setListas({
                personas: listas.personas || [],
                universidades: listas.universidades || [],
                titulos: listas.titulos || [],
            });
        } catch (err) {
            setError(`Error al obtener los datos: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchRelacionesYListas();
    }, []);

    // Mostrar notificación
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    // Manejar edición
    const handleEdit = (relacion) => {
        setEditingRelacion(relacion);
        setIsAdding(false);
    };

    // Manejar agregado
    const handleAdd = () => {
        setIsAdding(true);
        setEditingRelacion(null);
    };

    // Manejar cancelación
    const handleCancel = () => {
        setEditingRelacion(null);
        setIsAdding(false);
    };

    // Confirmar eliminación
    const handleDeleteClick = (relacion) => {
        setDeleteConfirm({
            isOpen: true,
            relacionId: relacion.Id_PUT,
            personaNombre: `${relacion.Nombre_Per} ${relacion.Paterno_Per}`,
        });
    };

    // Manejar eliminación
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/persona-universidad-titulo/${deleteConfirm.relacionId}`);
            setDeleteConfirm({ isOpen: false, relacionId: null, personaNombre: null });
            fetchRelacionesYListas();
            showToast("Relación eliminada exitosamente");
        } catch (err) {
            showToast("Error al eliminar la relación", "error");
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (formData) => {
        try {
            if (editingRelacion) {
                await axios.put(`/api/persona-universidad-titulo/${editingRelacion.Id_PUT}`, formData);
                showToast("Relación actualizada exitosamente");
            } else {
                await axios.post("/api/persona-universidad-titulo", formData);
                showToast("Relación agregada exitosamente");
            }
            fetchRelacionesYListas();
            handleCancel(); // Cerrar formulario
        } catch (error) {
            console.error("Error:", error);
            showToast(
                error.response?.data?.error || "Error al procesar la solicitud",
                "error"
            );
        }
    };

    return (
        <div className="flex w-full bg-gray-100 p-4">
            <div className="w-full">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center p-4">
                        <h1 className="text-2xl font-bold">Relaciones Persona-Universidad-Título</h1>
                        {error && <p className="text-red-500">{error}</p>}
                        <button
                            onClick={handleAdd}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Agregar Relación
                        </button>
                    </div>

                    {/* Tabla de relaciones */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-3">Persona</th>
                                    <th className="border px-4 py-3">Universidad</th>
                                    <th className="border px-4 py-3">Título</th>
                                    <th className="border px-4 py-3">Tema</th>
                                    <th className="border px-4 py-3">Estado</th>
                                    <th className="border px-4 py-3">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {relaciones.length > 0 ? (
                                    relaciones.map((relacion) => (
                                        <tr key={relacion.Id_PUT} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">
                                                {`${relacion.Nombre_Per} ${relacion.Paterno_Per} ${relacion.Materno_Per}`}
                                            </td>
                                            <td className="px-4 py-2">{relacion.Nombre_Uni}</td>
                                            <td className="px-4 py-2">{relacion.Descripcion_Tit}</td>
                                            <td className="px-4 py-2">{relacion.Tema_PUT || "N/A"}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm ${
                                                        relacion.Estado_PUT === "Activo"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-red-200 text-red-800"
                                                    }`}
                                                >
                                                    {relacion.Estado_PUT}
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">
                                            No hay relaciones registradas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            {(editingRelacion || isAdding) && (
                <RelacionForm
                    relacion={editingRelacion}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    listas={listas} // Pasamos las listas al formulario
                />
            )}

            {/* Confirmación de eliminación */}
            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                onClose={() =>
                    setDeleteConfirm({ isOpen: false, relacionId: null, personaNombre: null })
                }
                onConfirm={handleDelete}
                title="Confirmar Eliminación"
                message={
                    <>
                        ¿Desea eliminar la relación de{" "}
                        <strong>{deleteConfirm.personaNombre}</strong>?
                    </>
                }
            />

            {/* Notificaciones */}
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
