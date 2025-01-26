"use client";

export default function ColegioForm({ colegio, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {colegio ? "Editar Colegio" : "Agregar Colegio"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre del Colegio:</label>
          <input
            type="text"
            name="Nombre_Col"
            defaultValue={colegio?.Nombre_Col || ""}
            className="border px-4 py-2 rounded w-full"
            required
          />
        </div>
        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
