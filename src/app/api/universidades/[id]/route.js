import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        // Destructurando los datos enviados desde el frontend
        const { Nombre_Uni, Tipo_Uni, Sede_Uni } = body;

        // Validar que los campos obligatorios estén presentes
        if (!Nombre_Uni ) {
            return NextResponse.json(
                { error: "Los campos Nombre y Estado son obligatorios." },
                { status: 400 }
            );
        }

        // Reemplazar valores undefined o vacíos por null
        const result = await query(
            `UPDATE TbUniversidad SET 
                Nombre_Uni = ?, 
                Tipo_Uni = ?, 
                Sede_Uni = ?
            WHERE Id_Universidad = ?`,
            [
                Nombre_Uni,
                Tipo_Uni || null,
                Sede_Uni || null,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Universidad no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Universidad actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar universidad:", error);
        return NextResponse.json(
            { error: "Error interno del servidor", details: error.message },
            { status: 500 }
        );
    }
}


export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const result = await query(
            'UPDATE TbUniversidad SET Estado_Uni = "BA" WHERE Id_Universidad = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Universidad no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Universidad eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return NextResponse.json(
            { error: "Error al eliminar universidad", details: error.message },
            { status: 500 }
        );
    }
} 