"use client";

export default function PersonaForm({ persona, onSubmit, onCancel }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4">
                    {persona ? "Editar Persona" : "Agregar Persona"}
                </h2>
                <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            CI
                        </label>
                        <input
                            type="text"
                            name="CI_Per"
                            defaultValue={persona?.CI_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="Nombre_Per"
                            defaultValue={persona?.Nombre_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido Paterno
                        </label>
                        <input
                            type="text"
                            name="Paterno_Per"
                            defaultValue={persona?.Paterno_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Apellido Materno
                        </label>
                        <input
                            type="text"
                            name="Materno_Per"
                            defaultValue={persona?.Materno_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Sexo
                        </label>
                        <select
                            name="Sexo_Per"
                            defaultValue={persona?.Sexo_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Dirección
                        </label>
                        <input
                            type="text"
                            name="Direccion_Per"
                            defaultValue={persona?.Direccion_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Fecha de Nacimiento
                        </label>
                        <input
                            type="date"
                            name="FDN_Per"
                            defaultValue={
                                persona?.FDN_Per
                                    ? new Date(persona.FDN_Per)
                                          .toISOString()
                                          .split("T")[0]
                                    : ""
                            }
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Lugar de Nacimiento
                        </label>
                        <select
                            name="LDN_Per"
                            defaultValue={persona?.LDN_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="">Seleccione un departamento</option>
                            <option value="La Paz">La Paz</option>
                            <option value="Cochabamba">Cochabamba</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Oruro">Oruro</option>
                            <option value="Potosí">Potosí</option>
                            <option value="Chuquisaca">Chuquisaca</option>
                            <option value="Tarija">Tarija</option>
                            <option value="Beni">Beni</option>
                            <option value="Pando">Pando</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Correo
                        </label>
                        <input
                            type="email"
                            name="Correo_Per"
                            defaultValue={persona?.Correo_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="text"
                            name="Telefono_Per"
                            defaultValue={persona?.Telefono_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Estado
                        </label>
                        <select
                            name="Estado_Per"
                            defaultValue={persona?.Estado_Per}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
