"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FuncionarioUniversidadForm({ funcionarioUniversidad, onSubmit, onCancel }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [formData, setFormData] = useState({
    Id_Funcionario_FU: funcionarioUniversidad?.Id_Funcionario_FU || "",
    Id_Universidad_FU: funcionarioUniversidad?.Id_Universidad_FU || "",
    Fecha_Ini_FU: funcionarioUniversidad?.Fecha_Ini_FU?.split("T")[0] || "",
    Fecha_Fin_FU: funcionarioUniversidad?.Fecha_Fin_FU?.split("T")[0] || "",
    Observacion_FU: funcionarioUniversidad?.Observacion_FU || "",
  });

  // Cargar datos de funcionarios y universidades
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [funcRes, uniRes] = await Promise.all([
          axios.get("/api/funcionarios"),
          axios.get("/api/universidades"),
        ]);
        setFuncionarios(funcRes.data);
        setUniversidades(uniRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchOptions();
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevenir recarga de página
    onSubmit({
      Id_Funcionario_FU: formData.Id_Funcionario_FU,
      Id_Universidad_FU: formData.Id_Universidad_FU,
      Fecha_Ini_FU: formData.Fecha_Ini_FU,
      Fecha_Fin_FU: formData.Fecha_Fin_FU,
      Observacion_FU: formData.Observacion_FU,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {funcionarioUniversidad ? "Editar Relación" : "Agregar Relación"}
        </h2>

        {/* Selector de Funcionario */}
        <div className="mb-4">
          <label className="block text-gray-700">Funcionario:</label>
          <select
            name="Id_Funcionario_FU"
            value={formData.Id_Funcionario_FU}
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

        {/* Selector de Universidad */}
        <div className="mb-4">
          <label className="block text-gray-700">Universidad:</label>
          <select
            name="Id_Universidad_FU"
            value={formData.Id_Universidad_FU}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
            required
          >
            <option value="">Seleccione una Universidad</option>
            {universidades.map((universidad) => (
              <option key={universidad.Id_Universidad} value={universidad.Id_Universidad}>
                {universidad.Nombre_Uni}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha de Inicio */}
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Inicio:</label>
          <input
            type="date"
            name="Fecha_Ini_FU"
            value={formData.Fecha_Ini_FU}
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
            name="Fecha_Fin_FU"
            value={formData.Fecha_Fin_FU}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        {/* Observaciones */}
        <div className="mb-4">
          <label className="block text-gray-700">Observaciones:</label>
          <textarea
            name="Observacion_FU"
            value={formData.Observacion_FU}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
            rows="3"
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
