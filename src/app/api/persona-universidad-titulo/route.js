import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await query(`
            SELECT 
                put.*,
                p.Nombre_Per, p.Paterno_Per, p.Materno_Per,
                u.Nombre_Uni,
                t.Descripcion_Tit
            FROM TbPersonaUniversidadTitulo put
            JOIN TbPersona p ON put.Id_Persona_Put = p.Id_Persona
            JOIN TbUniversidad u ON put.Id_Universidad_Put = u.Id_Universidad
            JOIN TbTitulo t ON put.Id_Titulo_Put = t.Id_Titulo
        `);
        return NextResponse.json(result);
    } catch (error) {
        console.error("Error al obtener relaciones:", error);
        return NextResponse.json(
            { error: "Error al obtener relaciones", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put } = body;

        const result = await query(
            `INSERT INTO TbPersonaUniversidadTitulo 
            (Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put) 
            VALUES (?, ?, ?, ?)`,
            [Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put]
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error al crear relación:", error);
        return NextResponse.json(
            { error: "Error al crear relación", details: error.message },
            { status: 500 }
        );
    }
} 