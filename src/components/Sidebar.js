"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

// export default function Sidebar({ isOpen, setIsOpen }) {
export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const menuItems = [
        {
            path: "/personas",
            name: "Personas",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ),
        },
        {
            path: "/universidades",
            name: "Universidades",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            ),
        },
        {
            path: "/titulos",
            name: "Títulos",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                </svg>
            )
        },
        {
            path: "/persona-universidad-titulo",
            name: "Asignación de Títulos",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            path: "/jurados",
            name: "Jurados",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            path: "/colegios",
            name: "Colegios",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-5-5v6m5-6H7m5 0l4 4m0 0-4 4m4-4H7" />
                </svg>
            )
        },
        {
            path: "juradoColegio",
            name: "Jurado Colegio",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-5-5v6m5-6H7m5 0l4 4m0 0-4 4m4-4H7" />
                </svg>
            )
        },
        {
            path: "funcionarioUniversidad",
            name: "Funcionario Universidad",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            )
        },
        {
            path: "putJurado",
            name: "P.U.T. Jurado",
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-5-5v6m5-6H7m5 0l4 4m0 0-4 4m4-4H7" />
                </svg>
            )
        },
        // {
        // path: "/funcionarioColegioCargo",
        // name: "Funcionario Colegio Cargo",
        // icon: (
        //     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14v6m-5-5v6m5-6H7m5 0l4 4m0 0-4 4m4-4H7" />
        //    </svg>
        // )
        // }
    ];


    return (
        <>
            {/* Botón para abrir/cerrar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 ${isOpen ? "left-56" : "left-4"
                    } z-50 bg-gray-800 text-white p-2 rounded-full transition-all duration-300 hover:bg-gray-700`}
            >
                {isOpen ? (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        />
                    </svg>
                ) : (
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                    </svg>
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${isOpen ? "w-60" : "w-16"
                    } shadow-lg z-40`}
            >
                <nav className="p-4">
                    <div className="mb-8">
                        <h1
                            className={`text-xl font-bold ${!isOpen && "hidden"
                                }`}
                        >
                            Sistema Académico
                        </h1>
                    </div>
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${pathname === item.path
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-gray-700"
                                        }`}
                                >
                                    {item.icon}
                                    <span
                                        className={`transition-all ${!isOpen && "hidden"
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            <style jsx global>{`
        main {
          margin-left: ${isOpen ? '16rem' : '4rem'} !important;
          transition: margin-left 0.3s ease-in-out;
        }
      `}</style>

            {/* Overlay para cerrar en móviles */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
