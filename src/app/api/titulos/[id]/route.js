import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        const { Descripcion_Tit, Nivel_Tit } = body;

        const result = await query(
            `UPDATE TbTitulo SET 
                Descripcion_Tit = ?, 
                Nivel_Tit = ? 
            WHERE Id_Titulo = ?`,
            [Descripcion_Tit, Nivel_Tit, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Título no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Título actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar:", error);
        return NextResponse.json(
            { error: "Error al actualizar título", details: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const result = await query(
            'UPDATE TbTitulo SET Estado_Tit = "BA" WHERE Id_Titulo = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Título no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Título eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return NextResponse.json(
            { error: "Error al eliminar título", details: error.message },
            { status: 500 }
        );
    }
} 