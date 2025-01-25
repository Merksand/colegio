import './globals.css';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="flex">
          <Sidebar />
          <main className={`flex-1 transition-all duration-300`}  >

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
