"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import PersonaForm from "../../components/PersonaForm";
import '../../globals.css';
import ConfirmDialog from "../../components/ConfirmDialog";
import Toast from "../../components/Toast";
export default function Personas() {
   const [personas, setPersonas] = useState([]);
   const [error, setError] = useState(null);
   const [editingPersona, setEditingPersona] = useState(null);
   const [isAdding, setIsAdding] = useState(false);
   const [sidebarOpen, setSidebarOpen] = useState(true);
   const [deleteConfirm, setDeleteConfirm] = useState({
       isOpen: false,
       personaId: null,
       personaNombre: null
   });
   const [toast, setToast] = useState({
       show: false,
       message: '',
       type: 'success'
   });
    const fetchPersonas = async () => {
       try {
           const response = await axios.get("/api/personas");
           setPersonas(response.data);
       } catch (err) {
           setError("Error al obtener los datos: " + err.message);
       }
   };
    useEffect(() => {
       fetchPersonas();
   }, []);
    const formatDate = (dateString) => {
       const date = new Date(dateString);
       return date.toLocaleDateString('es-ES');
   };
    // Funciones de manejo de eventos
   const handleEdit = (persona) => {
       setEditingPersona(persona);
   };
    const handleAdd = () => {
       setIsAdding(true);
   };
    const handleDeleteClick = (persona) => {
       setDeleteConfirm({
           isOpen: true,
           personaId: persona.Id_Persona,
           personaNombre: `${persona.Nombre_Per} ${persona.Paterno_Per}`
       });
   };
    const handleDelete = async () => {
       try {
           await axios.delete(`/api/personas/${deleteConfirm.personaId}`);
           setDeleteConfirm({ isOpen: false, personaId: null, personaNombre: null });
           fetchPersonas();
           showToast('Persona eliminada exitosamente');
       } catch (err) {
           showToast("Error al eliminar la persona", 'error');
       }
   };
    const showToast = (message, type = 'success') => {
       setToast({ show: true, message, type });
       setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
   };
    const handleSubmit = async (e) => {
       e.preventDefault();
       const formData = new FormData(e.target);
       const data = Object.fromEntries(formData.entries());
       
       try {
           if (editingPersona) {
               await axios.put(`/api/personas/${editingPersona.Id_Persona}`, data);
               setEditingPersona(null);
               showToast('Persona actualizada exitosamente');
           } else {
               await axios.post('/api/personas', data);
               setIsAdding(false);
               showToast('Persona agregada exitosamente');
           }
           fetchPersonas();
       } catch (err) {
           showToast("Error en la operación", 'error');
       }
   };
    const handleCancel = () => {
       setEditingPersona(null);
       setIsAdding(false);
   };
    return (
       <div className="flex min-h-screen bg-gray-100">
           <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
           <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-16'}`}>
               <div className="p-4">
                   {/* ... resto del JSX ... */}
                   <div className="overflow-x-auto bg-white rounded-lg shadow">
                       {/* ... tabla y contenido ... */}
                       <button 
                           onClick={handleAdd}
                           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                       >
                           Agregar Nueva Persona
                       </button>
                   </div>
               </div>
                {(editingPersona || isAdding) && (
                   <PersonaForm
                       persona={editingPersona}
                       onSubmit={handleSubmit}
                       onCancel={handleCancel}
                   />
               )}
                <ConfirmDialog
                   isOpen={deleteConfirm.isOpen}
                   onClose={() => setDeleteConfirm({ isOpen: false, personaId: null, personaNombre: null })}
                   onConfirm={handleDelete}
                   title="Confirmar Eliminación"
                   message={`¿Está seguro que desea eliminar a ${deleteConfirm.personaNombre}? Esta acción no se puede deshacer.`}
               />
                {toast.show && (
                   <Toast
                       message={toast.message}
                       type={toast.type}
                       onClose={() => setToast({ show: false, message: '', type: 'success' })}
                   />
               )}
           </main>
       </div>
    );
}
