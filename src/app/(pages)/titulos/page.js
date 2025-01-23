"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TituloForm from "@/components/TituloForm";
import "@/app/globals.css";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Titulos() {
    const [titulos, setTitulos] = useState([]);
    const [error, setError] = useState(null);
    const [editingTitulo, setEditingTitulo] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState({
        isOpen: false,
        tituloId: null,
        tituloNombre: null,
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const fetchTitulos = async () => {
        try {
            const response = await axios.get("/api/titulos");
            setTitulos(response.data);
        } catch (err) {
            setError("Error al obtener los datos: " + err.message);
        }
    };

    useEffect(() => {
        fetchTitulos();
    }, []);

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
    };

    const handleEdit = (titulo) => {
        setEditingTitulo(titulo);
    };

    const handleAdd = () => {
        setIsAdding(true);
    };

    const handleCancel = () => {
        setEditingTitulo(null);
        setIsAdding(false);
    };

    const handleDeleteClick = (titulo) => {
        setDeleteConfirm({
            isOpen: true,
            tituloId: titulo.Id_Titulo,
            tituloNombre: titulo.Descripcion_Tit,
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/titulos/${deleteConfirm.tituloId}`);
            setDeleteConfirm({ isOpen: false, tituloId: null, tituloNombre: null });
            fetchTitulos();
            showToast("Título eliminado exitosamente");
        } catch (err) {
            showToast("Error al eliminar el título", "error");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            if (editingTitulo) {
                await axios.put(`/api/titulos/${editingTitulo.Id_Titulo}`, data);
                setEditingTitulo(null);
                showToast("Título actualizado exitosamente");
            } else {
                await axios.post("/api/titulos", data);
                setIsAdding(false);
                showToast("Título agregado exitosamente");
            }
            fetchTitulos();
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
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Títulos</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="w-full overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="px-4 py-2">Descripción</th>
                                        <th className="px-4 py-2">Nivel</th>
                                        <th className="px-4 py-2">Estado</th>
                                        <th className="px-4 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {titulos.map((titulo) => (
                                        <tr key={titulo.Id_Titulo} className="border-b hover:bg-gray-50">
                                            <td className="px-4 py-2">{titulo.Descripcion_Tit}</td>
                                            <td className="px-4 py-2">{titulo.Nivel_Tit}</td>
                                            <td className="px-4 py-2">
                                                <span className={`px-2 py-1 rounded-full text-sm ${
                                                    titulo.Estado_Tit === "Activo"
                                                        ? "bg-green-200 text-green-800"
                                                        : "bg-red-200 text-red-800"
                                                }`}>
                                                    {titulo.Estado_Tit}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(titulo)}
                                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(titulo)}
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
                                Agregar Título
                            </button>
                        </div>
                    </div>
                </div>

                {(editingTitulo || isAdding) && (
                    <TituloForm
                        titulo={editingTitulo}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                )}

                <ConfirmDialog
                    isOpen={deleteConfirm.isOpen}
                    onClose={() => setDeleteConfirm({ isOpen: false, tituloId: null, tituloNombre: null })}
                    onConfirm={handleDelete}
                    title="Confirmar Eliminación"
                    message={`¿Está seguro que desea eliminar el título "${deleteConfirm.tituloNombre}"?`}
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