import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const personas = await query("SELECT Id_Persona, Nombre_Per, Paterno_Per, Materno_Per FROM TbPersona WHERE Estado_Per = 'Activo'");
        const universidades = await query("SELECT Id_Universidad, Nombre_Uni FROM TbUniversidad WHERE Estado_Uni = 'Activo'");
        const titulos = await query("SELECT Id_Titulo, Descripcion_Tit FROM TbTitulo WHERE Estado_Tit = 'Activo'");

        return NextResponse.json({
            personas,
            universidades,
            titulos
        });
    } catch (error) {
        console.error("Error al obtener listas:", error);
        return NextResponse.json(
            { error: "Error al obtener listas", details: error.message },
            { status: 500 }
        );
    }
} 