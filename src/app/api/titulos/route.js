import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const titulos = await query("SELECT * FROM TbTitulo WHERE Estado_Tit = 'AC'");
        return NextResponse.json(titulos);
    } catch (error) {
        console.error("Error al obtener títulos:", error);
        return NextResponse.json(
            { error: "Error al obtener títulos", details: error.message },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { Descripcion_Tit, Nivel_Tit, Estado_Tit = "AC" } = body;

        const result = await query(
            "INSERT INTO TbTitulo (Descripcion_Tit, Nivel_Tit, Estado_Tit) VALUES (?, ?, ?)",
            [Descripcion_Tit, Nivel_Tit, Estado_Tit]
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error al crear título:", error);
        return NextResponse.json(
            { error: "Error al crear título", details: error.message },
            { status: 500 }
        );
    }
} 