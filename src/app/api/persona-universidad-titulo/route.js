import { query } from "@/lib/db";
import { NextResponse } from "next/server";

 
export async function GET() {
    try {
        // Obtener relaciones en `TbPersonaUniversidadTitulo`
        const relaciones = await query(`
            SELECT 
                put.*,
                p.Nombre_Per, p.Paterno_Per, p.Materno_Per,
                u.Nombre_Uni,
                t.Descripcion_Tit
            FROM TbPersonaUniversidadTitulo put
            JOIN TbPersona p ON put.Id_Persona_Put = p.Id_Persona
            JOIN TbUniversidad u ON put.Id_Universidad_Put = u.Id_Universidad
            JOIN TbTitulo t ON put.Id_Titulo_Put = t.Id_Titulo
            WHERE put.Estado_Put = 'AC'
        `);

        // Obtener listas necesarias
        const personas = await query(`
            SELECT Id_Persona, Nombre_Per, Paterno_Per, Materno_Per
            FROM TbPersona
            WHERE Estado_Per = 'AC'
        `);

        const universidades = await query(`
            SELECT Id_Universidad, Nombre_Uni
            FROM TbUniversidad
            WHERE Estado_Uni = 'AC'
        `);

        const titulos = await query(`
            SELECT Id_Titulo, Descripcion_Tit
            FROM TbTitulo
            WHERE Estado_Tit = 'AC'
        `);

        // Devolver relaciones y listas en una sola respuesta
        return NextResponse.json({
            relaciones,
            listas: {
                personas,
                universidades,
                titulos,
            },
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        return NextResponse.json(
            { error: "Error al obtener datos", details: error.message },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {
        const body = await request.json();
        const {
            Id_Persona_PUT,
            Id_Universidad_PUT,
            Id_Titulo_PUT,
            Tema_PUT,
            Fecha_PUT,
            Hora_PUT,
            Nota_PUT,
            Observacion_PUT,
        } = body;

        if (
            !Id_Persona_PUT ||
            !Id_Universidad_PUT ||
            !Id_Titulo_PUT ||
            !Tema_PUT ||
            !Fecha_PUT ||
            !Hora_PUT ||
            !Nota_PUT
        ) {
            return NextResponse.json(
                { error: "Todos los campos son obligatorios." },
                { status: 400 }
            );
        }

        const result = await query(
            `INSERT INTO TbPersonaUniversidadTitulo 
            (Id_Persona_PUT, Id_Universidad_PUT, Id_Titulo_PUT, Tema_PUT, Fecha_PUT, Hora_PUT, Nota_PUT, Observacion_PUT, Estado_PUT) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'AC')`,
            [
                Id_Persona_PUT,
                Id_Universidad_PUT,
                Id_Titulo_PUT,
                Tema_PUT,
                Fecha_PUT,
                Hora_PUT,
                Nota_PUT,
                Observacion_PUT,
            ]
        );

        return NextResponse.json({ message: "Relación creada exitosamente", result });
    } catch (error) {
        console.error("Error al crear relación:", error);
        return NextResponse.json(
            { error: "Error al crear relación", details: error.message },
            { status: 500 }
        );
    }
}
