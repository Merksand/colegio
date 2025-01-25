"use client";

export default function JuradoForm({ jurado, onSubmit, onCancel }) {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-lg max-h-[92vh] p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {jurado ? "Editar Jurado" : "Agregar Nuevo Jurado"}
          </h2>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CI */}
            <div>
              <label htmlFor="CI_Jur" className="block text-gray-700 font-bold mb-1">
                CI:
              </label>
              <input
                type="text"
                id="CI_Jur"
                name="CI_Jur"
                defaultValue={jurado?.CI_Jur || ""}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            {/* Grado Académico */}
            <div>
              <label htmlFor="Grado_Academico_Jur" className="block text-gray-700 font-bold mb-1">
                Grado Académico:
              </label>
              <select
                name="Grado_Academico_Jur"
                id="Grado_Academico_Jur"
                className="border rounded-lg px-4 py-2 w-full"
              >
                <option value="Licenciatura">Licenciatura</option>
                <option value="Maestria">Maestría</option>
                <option value="Doctorado">Doctorado</option>
              </select>
            </div>

            {/* Nombre */}
            <div>
              <label htmlFor="Nombre_Jur" className="block text-gray-700 font-bold mb-1">
                Nombre:
              </label>
              <input
                type="text"
                id="Nombre_Jur"
                name="Nombre_Jur"
                defaultValue={jurado?.Nombre_Jur || ""}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            {/* Apellido Paterno */}
            <div>
              <label htmlFor="Paterno_Jur" className="block text-gray-700 font-bold mb-1">
                Apellido Paterno:
              </label>
              <input
                type="text"
                id="Paterno_Jur"
                name="Paterno_Jur"
                defaultValue={jurado?.Paterno_Jur || ""}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>

            {/* Apellido Materno */}
            <div>
              <label htmlFor="Materno_Jur" className="block text-gray-700 font-bold mb-1">
                Apellido Materno:
              </label>
              <input
                type="text"
                id="Materno_Jur"
                name="Materno_Jur"
                defaultValue={jurado?.Materno_Jur || ""}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Sexo */}
            <div>
              <label htmlFor="Sexo_Jur" className="block text-gray-700 font-bold mb-1">
                Sexo:
              </label>
              <select
                id="Sexo_Jur"
                name="Sexo_Jur"
                defaultValue={jurado?.Sexo_Jur || ""}
                className="border rounded-lg px-4 py-2 w-full"
                required
              >
                <option value="">Seleccione</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>

            {/* Fecha de Nacimiento */}
            <div>
              <label htmlFor="FDN_Per" className="block text-gray-700 font-bold mb-1">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                id="FDN_Per"
                name="FDN_Per"
                defaultValue={jurado?.FDN_Per?.split("T")[0] || ""}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label htmlFor="Correo_Per" className="block text-gray-700 font-bold mb-1">
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="Correo_Per"
                name="Correo_Per"
                defaultValue={jurado?.Correo_Per || ""}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="Telefono_Per" className="block text-gray-700 font-bold mb-1">
                Teléfono:
              </label>
              <input
                type="text"
                id="Telefono_Per"
                name="Telefono_Per"
                defaultValue={jurado?.Telefono_Per || ""}
                className="border rounded-lg px-4 py-2 w-full"
              />
            </div>


            {/* select de los 9 departamentos de bolivia */}
            <div>
              <label htmlFor="LDN_Per" className="block text-gray-700 font-bold mb-1">
                Departamento:
              </label>
              <select
                id="LDN_Per"
                name="LDN_Per"
                className="border rounded-lg px-4 py-2 w-full"
                defaultValue={jurado?.LDN_Per || ""}
              >
                <option value="">Seleccione...</option>
                <option value="Chuquisaca">Chuquisaca</option>
                <option value="La Paz">La Paz</option>
                <option value="Cochabamba">Cochabamba</option>
                <option value="Oruro">Oruro</option>
                <option value="Potosi">Potosi</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Beni">Beni</option>
                <option value="Tarija">Tarija</option>
                <option value="Pando">Pando</option>
              </select>

            </div>
            {/* Botones */}
            <div className="col-span-2 flex justify-end gap-4 mt-4">
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
                {jurado ? "Actualizar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
