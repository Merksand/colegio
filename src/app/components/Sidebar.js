"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Sidebar({ isOpen, setIsOpen }) {
    const pathname = usePathname();

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
            path: "/persona-universidad-titulo",
            name: "Relaciones",
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
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                </svg>
            ),
        },
    ];

    return (
        <>
            {/* Botón para abrir/cerrar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed top-4 ${
                    isOpen ? "left-56" : "left-4"
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
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out ${
                    isOpen ? "w-60" : "w-16"
                } shadow-lg z-40`}
            >
                <nav className="p-4">
                    <div className="mb-8">
                        <h1
                            className={`text-xl font-bold ${
                                !isOpen && "hidden"
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
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                        pathname === item.path
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-700"
                                    }`}
                                >
                                    {item.icon}
                                    <span
                                        className={`transition-all ${
                                            !isOpen && "hidden"
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
