"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function JuradoColegioForm({ juradoColegio, onSubmit, onCancel }) {
    const [jurados, setJurados] = useState([]);
    const [colegios, setColegios] = useState([]);
    const [formData, setFormData] = useState({
        Id_Jurado_JC: juradoColegio?.Id_Jurado_JC || "",
        Id_Colegio_JC: juradoColegio?.Id_Colegio_JC || "",
        Fecha_Ini_JC: juradoColegio?.Fecha_Ini_JC?.split("T")[0] || "",
        Fecha_Fin_JC: juradoColegio?.Fecha_Fin_JC?.split("T")[0] || "",
        Observacion_JC: juradoColegio?.Observacion_JC || "",
    });

    // Obtener jurados y colegios para los select
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [juradoRes, colegioRes] = await Promise.all([
                    axios.get("/api/jurados"),
                    axios.get("/api/colegios"),
                ]);
                setJurados(juradoRes.data);
                setColegios(colegioRes.data);
            } catch (error) {
                console.error("Error al cargar jurados o colegios:", error);
            }
        };
        fetchOptions();
    }, []);

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("SIu",formData)
        onSubmit({
            Id_Jurado_JC: formData.Id_Jurado_JC,
            Id_Colegio_JC: formData.Id_Colegio_JC,
            Fecha_Ini_JC: formData.Fecha_Ini_JC,
            Fecha_Fin_JC: formData.Fecha_Fin_JC,
            Observacion_JC: formData.Observacion_JC,
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">
                    {juradoColegio ? "Editar Relación" : "Agregar Relación"}
                </h2>

                {/* Selector de Jurado */}
                <div className="mb-4">
                    <label className="block text-gray-700">Jurado:</label>
                    <select
                        name="Id_Jurado_JC"
                        value={formData.Id_Jurado_JC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                        required
                    >
                        <option value="">Seleccione un Jurado</option>
                        {jurados.map((jurado) => (
                            <option key={jurado.Id_Jurado} value={jurado.Id_Jurado}>
                                {jurado.Nombre_Jur} {jurado.Paterno_Jur}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selector de Colegio */}
                <div className="mb-4">
                    <label className="block text-gray-700">Colegio:</label>
                    <select
                        name="Id_Colegio_JC"
                        value={formData.Id_Colegio_JC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                        required
                    >
                        <option value="">Seleccione un Colegio</option>
                        {colegios.map((colegio) => (
                            <option key={colegio.Id_Colegio} value={colegio.Id_Colegio}>
                                {colegio.Nombre_Col}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha de Inicio */}
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="Fecha_Ini_JC"
                        value={formData.Fecha_Ini_JC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                        required
                    />
                </div>

                {/* Fecha de Fin */}
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Fin:</label>
                    <input
                        type="date"
                        name="Fecha_Fin_JC"
                        value={formData.Fecha_Fin_JC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                    />
                </div>

                {/* Observación */}
                <div className="mb-4">
                    <label className="block text-gray-700">Observación:</label>
                    <textarea
                        name="Observacion_JC"
                        value={formData.Observacion_JC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                    ></textarea>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
