'use client';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const hideSidebarRoutes = ["/auth", "/auth/login", "/auth/crearCuenta", "/auth/resetPassword"];
  const pathname = usePathname();
  const shouldHideSidebar = hideSidebarRoutes.some((route) => pathname.startsWith(route));

  return (
    <html lang="es">
      <body>
        <div className="flex">
          {/* Mostrar Sidebar solo si no estamos en una ruta de auth */}
          {!shouldHideSidebar && <Sidebar />}
          <main className={`flex-1 transition-all duration-300`}  >

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
