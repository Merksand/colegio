// import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <div className="flex">
          {children}
        </div>
      </body>
    </html>
  );
}
