"use client";

export default function TituloForm({ titulo, onSubmit, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">
                    {titulo ? 'Editar Título' : 'Agregar Título'}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Descripción</label>
                        <input
                            type="text"
                            name="Descripcion_Tit"
                            defaultValue={titulo?.Descripcion_Tit}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nivel</label>
                        <select
                            name="Nivel_Tit"
                            defaultValue={titulo?.Nivel_Tit}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Licenciatura">Licenciatura</option>
                            <option value="Maestría">Maestría</option>
                            <option value="Doctorado">Doctorado</option>
                            <option value="Técnico">Técnico</option>
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
                            {titulo ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 