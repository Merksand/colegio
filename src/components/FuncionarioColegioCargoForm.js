"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FuncionarioColegioCargoForm({ funcionarioColegio, onSubmit, onCancel }) {
    const [funcionarios, setFuncionarios] = useState([]);
    const [colegios, setColegios] = useState([]);
    const [cargos, setCargos] = useState([]);
    const [formData, setFormData] = useState({
        Id_Funcionario_FCC: funcionarioColegio?.Id_Funcionario_FCC || "",
        Id_Colegio_FCC: funcionarioColegio?.Id_Colegio_FCC || "",
        Id_Cargo_FCC: funcionarioColegio?.Id_Cargo_FCC || "",
        Fec_Inicio_FCC: funcionarioColegio?.Fec_Inicio_FCC || "",
        Fec_Fin_FCC: funcionarioColegio?.Fec_Fin_FCC || "",
    });

    // Cargar datos de funcionarios, colegios y cargos
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [funcRes, colRes, carRes] = await Promise.all([
                    axios.get("/api/funcionarios"),
                    axios.get("/api/colegios"),
                    axios.get("/api/cargos"),
                ]);
                setFuncionarios(funcRes.data);
                setColegios(colRes.data);
                setCargos(carRes.data);
            } catch (error) {
                console.error("Error al cargar opciones:", error);
            }
        };
        fetchOptions();
    }, []);

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Evitar recarga de página
        onSubmit(formData); // Enviar los datos al componente padre
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <form
                onSubmit={handleFormSubmit}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-xl font-bold mb-4">
                    {funcionarioColegio ? "Editar Relación" : "Agregar Relación"}
                </h2>

                {/* Selector de Funcionario */}
                <div className="mb-4">
                    <label className="block text-gray-700">Funcionario:</label>
                    <select
                        name="Id_Funcionario_FCC"
                        value={formData.Id_Funcionario_FCC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                        required
                    >
                        <option value="">Seleccione un Funcionario</option>
                        {funcionarios.map((funcionario) => (
                            <option key={funcionario.Id_Funcionario} value={funcionario.Id_Funcionario}>
                                {funcionario.Nombre_Fun} {funcionario.Paterno_Fun}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selector de Colegio */}
                <div className="mb-4">
                    <label className="block text-gray-700">Colegio:</label>
                    <select
                        name="Id_Colegio_FCC"
                        value={formData.Id_Colegio_FCC}
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

                {/* Selector de Cargo */}
                <div className="mb-4">
                    <label className="block text-gray-700">Cargo:</label>
                    <select
                        name="Id_Cargo_FCC"
                        value={formData.Id_Cargo_FCC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                        required
                    >
                        <option value="">Seleccione un Cargo</option>
                        {cargos.map((cargo) => (
                            <option key={cargo.Id_Cargo} value={cargo.Id_Cargo}>
                                {cargo.Nombre_Car}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fecha de Inicio */}
                <div className="mb-4">
                    <label className="block text-gray-700">Fecha de Inicio:</label>
                    <input
                        type="date"
                        name="Fec_Inicio_FCC"
                        value={formData.Fec_Inicio_FCC}
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
                        name="Fec_Fin_FCC"
                        value={formData.Fec_Fin_FCC}
                        onChange={handleInputChange}
                        className="border px-4 py-2 rounded w-full"
                    />
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
