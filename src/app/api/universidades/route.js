import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const universidades = await query("SELECT * FROM TbUniversidad WHERE Estado_Uni = 'AC'");
        return NextResponse.json(universidades);
    } catch (error) {
        console.error("Error al obtener universidades:", error);
        return NextResponse.json(
            { error: "Error al obtener universidades", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { Nombre_Uni, Tipo_Uni, Sede_Uni, Estado_Uni = 'AC' } = body;

        const result = await query(
            "INSERT INTO TbUniversidad (Nombre_Uni, Tipo_Uni, Sede_Uni, Estado_Uni) VALUES (?, ?, ?, ?)",
            [Nombre_Uni, Tipo_Uni, Sede_Uni, Estado_Uni]
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error al crear universidad:", error);
        return NextResponse.json(
            { error: "Error al crear universidad", details: error.message },
            { status: 500 }
        );
    }
} 