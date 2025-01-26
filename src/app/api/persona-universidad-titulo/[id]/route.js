import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params; // ID de la relación a actualizar
        const body = await request.json();
        const {
            Id_Persona_Put,
            Id_Universidad_Put,
            Id_Titulo_Put,
            Tema_PUT = null,
            Fecha_PUT = null,
            Hora_PUT = null,
            Nota_PUT = null,
            Observacion_PUT = null,
            Estado_Put = "AC", // Estado por defecto
        } = body;

        // Validar los campos obligatorios
        if (!Id_Persona_Put || !Id_Universidad_Put || !Id_Titulo_Put) {
            return NextResponse.json(
                { error: "Los campos Id_Persona_Put, Id_Universidad_Put e Id_Titulo_Put son obligatorios" },
                { status: 400 }
            );
        }

        // Actualizar la relación
        const result = await query(
            `UPDATE TbPersonaUniversidadTitulo SET 
                Id_Persona_Put = ?,
                Id_Universidad_Put = ?,
                Id_Titulo_Put = ?,
                Tema_PUT = ?,
                Fecha_PUT = ?,
                Hora_PUT = ?,
                Nota_PUT = ?,
                Observacion_PUT = ?,
                Estado_Put = ?
            WHERE Id_PUT = ?`,
            [
                Id_Persona_Put,
                Id_Universidad_Put,
                Id_Titulo_Put,
                Tema_PUT,
                Fecha_PUT,
                Hora_PUT,
                Nota_PUT,
                Observacion_PUT,
                Estado_Put,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Relación no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Relación actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar relación:", error);
        return NextResponse.json(
            { error: "Error al actualizar relación", details: error.message },
            { status: 500 }
        );
    }
}



export async function DELETE(request, { params }) {
    try {
        const { id } = params; // ID de la relación a eliminar

        // Actualizar el estado a "BA" para eliminación lógica
        const result = await query(
            'UPDATE TbPersonaUniversidadTitulo SET Estado_Put = "BA" WHERE Id_PUT = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Relación no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Relación eliminada lógicamente" });
    } catch (error) {
        console.error("Error al eliminar relación:", error);
        return NextResponse.json(
            { error: "Error al eliminar relación", details: error.message },
            { status: 500 }
        );
    }
}
