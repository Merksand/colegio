import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put } = body;

        const result = await query(
            `UPDATE TbPersonaUniversidadTitulo SET 
                Id_Persona_Put = ?,
                Id_Universidad_Put = ?,
                Id_Titulo_Put = ?,
                Estado_Put = ?
            WHERE Id_PUT = ?`,
            [Id_Persona_Put, Id_Universidad_Put, Id_Titulo_Put, Estado_Put, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Relación no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Relación actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar:", error);
        return NextResponse.json(
            { error: "Error al actualizar relación", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const result = await query(
            'DELETE FROM TbPersonaUniversidadTitulo WHERE Id_PUT = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Relación no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Relación eliminada exitosamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return NextResponse.json(
            { error: "Error al eliminar relación", details: error.message },
            { status: 500 }
        );
    }
} 