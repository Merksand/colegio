import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
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
            Estado_PUT,
        } = body;

        // Validar que todos los campos requeridos están presentes
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
            `UPDATE TbPersonaUniversidadTitulo SET 
                Id_Persona_PUT = ?, 
                Id_Universidad_PUT = ?, 
                Id_Titulo_PUT = ?, 
                Tema_PUT = ?, 
                Fecha_PUT = ?, 
                Hora_PUT = ?, 
                Nota_PUT = ?, 
                Observacion_PUT = ?, 
                Estado_PUT = ?
            WHERE Id_PUT = ?`,
            [
                Id_Persona_PUT,
                Id_Universidad_PUT,
                Id_Titulo_PUT,
                Tema_PUT,
                Fecha_PUT,
                Hora_PUT,
                Nota_PUT,
                Observacion_PUT,
                Estado_PUT,
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
