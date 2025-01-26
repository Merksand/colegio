import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
    try {
        const [rows] = await pool.query("SELECT * FROM TbColegio WHERE Id_Colegio = ?", [params.id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: "Colegio no encontrado" }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error("Error al obtener el colegio:", error);
        return NextResponse.json({ error: "Error al obtener el colegio" }, { status: 500 });
    }
}


 
export async function PUT(request, { params }) {
    try {
        const { Nombre_Col, Estado_Col } = await request.json();

        // Validar datos
        if (!Nombre_Col && !Estado_Col) {
            return NextResponse.json({ error: "Datos insuficientes para actualizar" }, { status: 400 });
        }

        // Actualizar el colegio (nombre o estado)
        const [result] = await pool.query(
            "UPDATE TbColegio SET Nombre_Col = COALESCE(?, Nombre_Col), Estado_Col = COALESCE(?, Estado_Col) WHERE Id_Colegio = ?",
            [Nombre_Col, Estado_Col, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Colegio no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Colegio actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar el colegio:", error);
        return NextResponse.json({ error: "Error al actualizar el colegio" }, { status: 500 });
    }
}


 

export async function DELETE(request, { params }) {
    try {
        const [result] = await pool.query(
            "UPDATE TbColegio SET Estado_Col = 'BA' WHERE Id_Colegio = ?",
            [params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "Colegio no encontrado" }, { status: 404 });
        }

        return NextResponse.json({ message: "Colegio eliminado lógicamente" });
    } catch (error) {
        console.error("Error al eliminar el colegio:", error);
        return NextResponse.json({ error: "Error al eliminar el colegio" }, { status: 500 });
    }
}
