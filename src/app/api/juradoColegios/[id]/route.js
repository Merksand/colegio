import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(`
            SELECT jc.Id_JuradoColegio, jc.Id_Jurado_JC, jc.Id_Colegio_JC, jc.Fecha_Ini_JC, 
                   jc.Fecha_Fin_JC, jc.Observacion_JC, jc.Estado_FCC, 
                   j.Nombre_Jur AS NombreJurado, c.Nombre_Col AS NombreColegio
            FROM TbJuradoColegio jc
            INNER JOIN TbJurado j ON jc.Id_Jurado_JC = j.Id_Jurado
            INNER JOIN TbColegio c ON jc.Id_Colegio_JC = c.Id_Colegio
            WHERE jc.Id_JuradoColegio = ?
        `, [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la relación por ID:", error);
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}


export async function PUT(request, { params }) {
  try {
    const { Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC, Fecha_Fin_JC, Observacion_JC } = await request.json();

    if (!Id_Jurado_JC || !Id_Colegio_JC || !Fecha_Ini_JC) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [result] = await pool.query(`
            UPDATE TbJuradoColegio
            SET Id_Jurado_JC = ?, Id_Colegio_JC = ?, Fecha_Ini_JC = ?, Fecha_Fin_JC = ?, Observacion_JC = ?
            WHERE Id_JuradoColegio = ?
        `, [Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC, Fecha_Fin_JC || null, Observacion_JC, params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Jurado-Colegio actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la relación:", error);
    return NextResponse.json({ error: "Error al actualizar los datos" }, { status: 500 });
  }
}



export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query(`
            UPDATE TbJuradoColegio
            SET Estado_FCC = 'BA'
            WHERE Id_JuradoColegio = ?
        `, [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Jurado-Colegio eliminada lógicamente" });
  } catch (error) {
    console.error("Error al eliminar la relación:", error);
    return NextResponse.json({ error: "Error al eliminar los datos" }, { status: 500 });
  }
}
