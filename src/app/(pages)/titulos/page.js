"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TituloForm from "@/components/TituloForm";
import '@/app/globals.css'
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";


export default function Titulos() {
    const [titulos, setTitulos] = useState([]);
    const [error, setError] = useState(null);
    const [editingTitulo, setEditingTitulo] = useState(null);
    const [isAdding, setIsAdding] = useState(false);

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
        <>
            <div className="p-4 w-full bg-gray-100 rounded-lg">
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold mb-4 p-4">Lista de Títulos</h1>
                        {error && <p className="text-red-500 px-4">{error}</p>}
                        <div className="p-4">
                            <button
                                onClick={handleAdd}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Agregar Título
                            </button>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300  px-4 py-3 text-[1rem]">Descripción</th>
                                    <th className="border border-gray-300  px-4 py-3 text-[1rem]">Nivel</th>
                                    <th className="border border-gray-300  px-4 py-3 text-[1rem]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {titulos.map((titulo) => (
                                    <tr key={titulo.Id_Titulo} className="border-b hover:bg-gray-50">
                                        <td className="border border-gray-300  px-4 py-2">{titulo.Descripcion_Tit}</td>
                                        <td className="border border-gray-300  px-4 py-2">{titulo.Nivel_Tit}</td>
                                        <td className="border border-gray-300  px-4 py-2">
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
                message={<>¿Está seguro que desea eliminar el título <strong>{deleteConfirm.tituloNombre}</strong>?</>}
            />

            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ show: false, message: "", type: "success" })}
                />
            )}
        </>
    );
} 