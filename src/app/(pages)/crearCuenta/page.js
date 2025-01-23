'use client';
import '@/app/globals.css';
import { useState, useEffect } from 'react';

export default function CrearCuenta() {
  const [ci, setCi] = useState('');
  const [persona, setPersona] = useState(null);
  const [usuarioGenerado, setUsuarioGenerado] = useState('');
  const [passwordGenerado, setPasswordGenerado] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('');
        setSuccessMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const verificarPersona = async () => {
    try {
      const response = await fetch(`/api/personas/${ci}`);
      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        setPersona(null);
        return;
      }

      if (data.length === 0) {
        setErrorMessage('No se encontró una persona con este CI.');
        setPersona(null);
        return;
      }

      const persona = data;
      const usuario = `${persona.Nombre_Per}${persona.Paterno_Per}`.toLowerCase();
      const password = Math.random().toString(36).slice(-8) + '!@#';

      setPersona(persona);
      setUsuarioGenerado(usuario);
      setPasswordGenerado(password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error al verificar la persona.');
    }
  };

  const crearCuenta = async () => {
    try {
      const response = await fetch(`/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id_Persona: persona.Id_Persona,
          Usuario: usuarioGenerado,
          Password: passwordGenerado,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la cuenta.');
      }

      setSuccessMessage('Cuenta creada correctamente.');
      setPersona(null);
      setUsuarioGenerado('');
      setPasswordGenerado('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>

      {errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">C.I.</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={ci}
              onChange={(e) => setCi(e.target.value)}
              className="flex-1 p-2 border rounded-lg dark:bg-gray-700 text-white"
            />
            <button
              onClick={verificarPersona}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Verificar
            </button>
          </div>
        </div>

        {persona && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                value={persona.Nombre_Per}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Apellido</label>
              <input
                type="text"
                value={persona.Paterno_Per}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Usuario</label>
              <input
                type="text"
                value={usuarioGenerado}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="text"
                value={passwordGenerado}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-white"
              />
            </div>

            <button
              onClick={crearCuenta}
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Crear Cuenta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
