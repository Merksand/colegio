import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
            SELECT Id_PUT, Id_Persona_PUT, Id_Universidad_PUT, Id_Titulo_PUT, 
                   Tema_PUT, Fecha_PUT, Hora_PUT, Nota_PUT, Observacion_PUT, Estado_PUT,
                   p.Nombre_Per AS PersonaNombre, 
                   u.Nombre_Uni AS UniversidadNombre,
                   t.Descripcion_Tit AS TituloDescripcion
            FROM TbPersonaUniversidadTitulo ptu
            INNER JOIN TbPersona p ON ptu.Id_Persona_PUT = p.Id_Persona
            INNER JOIN TbUniversidad u ON ptu.Id_Universidad_PUT = u.Id_Universidad
            INNER JOIN TbTitulo t ON ptu.Id_Titulo_PUT = t.Id_Titulo
            WHERE Estado_PUT = 'AC'
        `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los PUTs:", error);
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}
