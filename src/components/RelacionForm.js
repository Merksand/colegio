"use client";

import { useEffect, useState } from "react";

export default function RelacionForm({ relacion, onSubmit, onCancel, listas }) {
    const [formData, setFormData] = useState({
        Id_Persona_PUT: relacion?.Id_Persona_PUT || "",
        Id_Universidad_PUT: relacion?.Id_Universidad_PUT || "",
        Id_Titulo_PUT: relacion?.Id_Titulo_PUT || "",
        Tema_PUT: relacion?.Tema_PUT || "",
        Fecha_PUT: relacion?.Fecha_PUT?.split("T")[0] || "",
        Hora_PUT: relacion?.Hora_PUT || "",
        Nota_PUT: relacion?.Nota_PUT || "",
        Observacion_PUT: relacion?.Observacion_PUT || "",
        Estado_PUT: relacion?.Estado_PUT || "AC",
    });

    // Sincronizar datos cuando se recibe una nueva relación para editar
    useEffect(() => {
        if (relacion) {
            const updatedFormData = {
                Id_Persona_PUT: relacion?.Id_Persona_PUT || "",
                Id_Universidad_PUT: relacion?.Id_Universidad_PUT || "",
                Id_Titulo_PUT: relacion?.Id_Titulo_PUT || "",
                Tema_PUT: relacion?.Tema_PUT || "",
                Fecha_PUT: relacion?.Fecha_PUT?.split("T")[0] || "",
                Hora_PUT: relacion?.Hora_PUT || "",
                Nota_PUT: relacion?.Nota_PUT || "",
                Observacion_PUT: relacion?.Observacion_PUT || "",
                Estado_PUT: relacion?.Estado_PUT || "AC",
            };
            setFormData(updatedFormData);

            console.log("Datos sincronizados de la relación:", updatedFormData);
        }
    }, [relacion]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos enviados del formulario:", formData);
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {relacion ? "Editar Relación" : "Agregar Relación"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Persona */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Persona</label>
                        <select
                            name="Id_Persona_PUT"
                            value={formData.Id_Persona_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione una persona...</option>
                            {listas.personas.map((persona) => (
                                <option key={persona.Id_Persona} value={persona.Id_Persona}>
                                    {`${persona.Nombre_Per} ${persona.Paterno_Per} ${persona.Materno_Per}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Universidad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Universidad</label>
                        <select
                            name="Id_Universidad_PUT"
                            value={formData.Id_Universidad_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione una universidad...</option>
                            {listas.universidades.map((universidad) => (
                                <option key={universidad.Id_Universidad} value={universidad.Id_Universidad}>
                                    {universidad.Nombre_Uni}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Título</label>
                        <select
                            name="Id_Titulo_PUT"
                            value={formData.Id_Titulo_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione un título...</option>
                            {listas.titulos.map((titulo) => (
                                <option key={titulo.Id_Titulo} value={titulo.Id_Titulo}>
                                    {titulo.Descripcion_Tit}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tema */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tema</label>
                        <input
                            type="text"
                            name="Tema_PUT"
                            value={formData.Tema_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="Ingrese el tema"
                        />
                    </div>

                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fecha</label>
                        <input
                            type="date"
                            name="Fecha_PUT"
                            value={formData.Fecha_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {/* Hora */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hora</label>
                        <input
                            type="time"
                            name="Hora_PUT"
                            value={formData.Hora_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>

                    {/* Nota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nota</label>
                        <input
                            type="number"
                            name="Nota_PUT"
                            value={formData.Nota_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            placeholder="Ingrese la nota"
                            step="0.01"
                        />
                    </div>

                    {/* Observaciones */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Observaciones</label>
                        <textarea
                            name="Observacion_PUT"
                            value={formData.Observacion_PUT}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            rows="3"
                            placeholder="Ingrese observaciones (opcional)"
                        ></textarea>
                    </div>

                    {/* Botones */}
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
                            {relacion ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
