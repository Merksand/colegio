"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function RelacionForm({ relacion, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        Id_Persona_Put: relacion?.Id_Persona_Put || "",
        Id_Universidad_Put: relacion?.Id_Universidad_Put || "",
        Id_Titulo_Put: relacion?.Id_Titulo_Put || "",
        Estado_Put: relacion?.Estado_Put || "Activo",
    });

    const [listas, setListas] = useState({
        personas: [],
        universidades: [],
        titulos: [],
    });

    useEffect(() => {
        const fetchListas = async () => {
            try {
                const response = await axios.get("/api/listas");
                setListas(response.data);
            } catch (error) {
                console.error("Error al cargar las listas:", error);
            }
        };
        fetchListas();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {relacion ? 'Editar Relación' : 'Agregar Relación'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Persona</label>
                        <select
                            name="Id_Persona_Put"
                            value={formData.Id_Persona_Put}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione una persona...</option>
                            {listas.personas?.map((persona) => (
                                <option key={persona.Id_Persona} value={persona.Id_Persona}>
                                    {`${persona.Nombre_Per} ${persona.Paterno_Per} ${persona.Materno_Per}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Universidad</label>
                        <select
                            name="Id_Universidad_Put"
                            value={formData.Id_Universidad_Put}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione una universidad...</option>
                            {listas.universidades?.map((universidad) => (
                                <option key={universidad.Id_Universidad} value={universidad.Id_Universidad}>
                                    {universidad.Nombre_Uni}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <select
                            name="Id_Titulo_Put"
                            value={formData.Id_Titulo_Put}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione un título...</option>
                            {listas.titulos?.map((titulo) => (
                                <option key={titulo.Id_Titulo} value={titulo.Id_Titulo}>
                                    {titulo.Descripcion_Tit}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Estado</label>
                        <select
                            name="Estado_Put"
                            value={formData.Estado_Put}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
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
                            {relacion ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
