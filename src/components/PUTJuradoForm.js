"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function PUTJuradoForm({ putJurado, onSubmit, onCancel }) {
  const [puts, setPuts] = useState([]);
  const [jurados, setJurados] = useState([]);
  const [formData, setFormData] = useState({
    Id_PUT_Jur: putJurado?.Id_PUT_Jur || "",
    Id_Jurado_Jur: putJurado?.Id_Jurado_Jur || "",
    Representante_Jur: putJurado?.Representante_Jur || "",
    Observacion_Jur: putJurado?.Observacion_Jur || "",
  });

  // Cargar datos de PUT y jurados
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [putRes, juradoRes] = await Promise.all([
          axios.get("/api/universidadTitulo"), // Endpoint para listar todos los PUTs
          axios.get("/api/jurados"), // Endpoint para listar todos los jurados
        ]);
        setPuts(putRes.data);
        setJurados(juradoRes.data);
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
    e.preventDefault(); // Evita recargar la página
    onSubmit(formData); // Envía los datos al componente padre
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {putJurado ? "Editar Relación PUT-Jurado" : "Agregar Relación PUT-Jurado"}
        </h2>

        {/* Selector de PUT */}
        <div className="mb-4">
          <label className="block text-gray-700">PUT:</label>
          <select
            name="Id_PUT_Jur"
            value={formData.Id_PUT_Jur}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
            required
          >
            <option value="">Seleccione un PUT</option>
            {puts.map((put) => (
              <option key={put.Id_PUT} value={put.Id_PUT}>
                {put.Tema_PUT}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de Jurado */}
        <div className="mb-4">
          <label className="block text-gray-700">Jurado:</label>
          <select
            name="Id_Jurado_Jur"
            value={formData.Id_Jurado_Jur}
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

        {/* Campo de Representante */}
        <div className="mb-4">
          <label className="block text-gray-700">Representante:</label>
          <input
            type="text"
            name="Representante_Jur"
            value={formData.Representante_Jur}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
            placeholder="Ingrese el nombre del representante"
            required
          />
        </div>

        {/* Observaciones */}
        <div className="mb-4">
          <label className="block text-gray-700">Observaciones:</label>
          <textarea
            name="Observacion_Jur"
            value={formData.Observacion_Jur}
            onChange={handleInputChange}
            className="border px-4 py-2 rounded w-full"
            rows="3"
            placeholder="Ingrese observaciones (opcional)"
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
