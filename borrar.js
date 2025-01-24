'use client';
import '@/app/globals.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';
export default function CrearCuenta() {
  const [ci, setCi] = useState('');
  const [funcionario, setFuncionario] = useState(null);
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
    if (!ci) {
      setErrorMessage('Por favor, ingresa un CI.');
      setFuncionario(null);
      return;
    }
    try {
      const response = await fetch(`/api/funcionarios/${ci}`);
      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        setFuncionario(null);
        return;
      }

      if (data.length === 0) {
        setErrorMessage('No se encontró una funcionario con este CI.');
        setFuncionario(null);
        return;
      }

      const funcionario = data;
      console.log("PERSONA: ", funcionario);
      const usuario = `${funcionario.Nombre_Fun}${funcionario.Paterno_Fun}`.toLowerCase();
      const password = Math.random().toString(36).slice(-8) + '!@#';

      setFuncionario(funcionario);
      setUsuarioGenerado(usuario);
      setPasswordGenerado(password);
      setErrorMessage('');

      console.log('Persona encontrada:', funcionario.Id_Funcionario);
      console.log('Usuario generado:', usuario);
      console.log('Contraseña generada:', password);
    } catch (error) {
      setErrorMessage('Error al verificar la funcionario.');
    }
  };

  const crearCuenta = async () => {
    try {
      console.log("Dentro de try: ", funcionario.Id_Funcionario)
      const response = await fetch(`/api/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id_Funcionario: funcionario.Id_Funcionario,
          Usuario: usuarioGenerado,
          Password: passwordGenerado,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear la cuenta.');
      }

      setSuccessMessage('Cuenta creada correctamente.');
      setFuncionario(null);
      setUsuarioGenerado('');
      setPasswordGenerado('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };


  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            {/* <img src="/logo.png" width={200} height={200} className="w-full mx-auto" alt='f' /> */}
          </div>
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4" />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853" />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04" />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335" />
                    </svg>
                  </div>
                  <span className="ml-4">
                    Sign In with Google
                  </span>
                </button>

              </div>

              <div className="my-12 border-b text-center">
                <div
                  className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Or sign In with Cartesian E-mail
                </div>
              </div>

              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email" placeholder="Email" />
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password" placeholder="Password" />
                <button
                  className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-">
                    Sign In
                  </span>
                </button>

              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          {/* Sección derecha */}
          <div
            className="hidden lg:flex flex-1 bg-cover bg-center mb-16 box-border"
            style={{ backgroundImage: "url('img/logo2.svg')" }}
          >
          </div>
        </div>
      </div>
    </div >
  );
}


console.log("------------------------------------------------")
return (
  <div className="p-6 max-w-lg mx-auto bg-white dark:text-white dark:bg-gray-800 rounded-lg shadow-lg" >
    <h1 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h1>

    {
      errorMessage && (
        <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
          {errorMessage}
        </div>
      )
    }
    {
      successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4 text-center">
          {successMessage}
        </div>
      )
    }

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

      {funcionario && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={funcionario.Nombre_Fun}
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellido</label>
            <input
              type="text"
              value={funcionario.Paterno_Fun}
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
  </div >
);