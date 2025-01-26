"use client";

import { useState, useEffect } from "react";

export default function UniversidadForm({ universidad, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        Nombre_Uni: universidad?.Nombre_Uni || "",
        Tipo_Uni: universidad?.Tipo_Uni || "",
        Sede_Uni: universidad?.Sede_Uni || "",
    });

    useEffect(() => {
        // Si el componente recibe una universidad, actualiza el estado
        if (universidad) {
            setFormData({
                Nombre_Uni: universidad.Nombre_Uni || "",
                Tipo_Uni: universidad.Tipo_Uni || "",
                Sede_Uni: universidad.Sede_Uni || "",
            });
        }
    }, [universidad]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Envía los datos actualizados al padre
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {universidad ? "Editar Universidad" : "Agregar Universidad"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="Nombre_Uni"
                            value={formData.Nombre_Uni}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            name="Tipo_Uni"
                            value={formData.Tipo_Uni}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Pública">Pública</option>
                            <option value="Privada">Privada</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Sede</label>
                        <input
                            type="text"
                            name="Sede_Uni"
                            value={formData.Sede_Uni}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            {universidad ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
