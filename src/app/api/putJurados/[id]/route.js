import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(`
            SELECT pj.Id_PUT_Jurado, pj.Id_PUT_Jur, pj.Id_Jurado_Jur, 
                   pj.Representante_Jur, pj.Observacion_Jur, pj.Estado_Jur,
                   p.Tema_PUT AS PUTTema,
                   j.Nombre_Jur AS JuradoNombre, j.Paterno_Jur AS JuradoPaterno
            FROM TbPUT_Jurado pj
            INNER JOIN TbPersonaUniversidadTitulo p ON pj.Id_PUT_Jur = p.Id_PUT
            INNER JOIN TbJurado j ON pj.Id_Jurado_Jur = j.Id_Jurado
            WHERE pj.Id_PUT_Jurado = ?
        `, [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la relación PUT-Jurado por ID:", error);
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}



export async function PUT(request, { params }) {
  try {
    const { Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur } = await request.json();

    if (!Id_PUT_Jur || !Id_Jurado_Jur || !Representante_Jur) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [result] = await pool.query(`
            UPDATE TbPUT_Jurado
            SET Id_PUT_Jur = ?, Id_Jurado_Jur = ?, Representante_Jur = ?, Observacion_Jur = ?
            WHERE Id_PUT_Jurado = ?
        `, [Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur || null, params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación PUT-Jurado actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la relación PUT-Jurado:", error);
    return NextResponse.json({ error: "Error al actualizar los datos" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query(`
            UPDATE TbPUT_Jurado
            SET Estado_Jur = 'BA'
            WHERE Id_PUT_Jurado = ?
        `, [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación PUT-Jurado eliminada lógicamente" });
  } catch (error) {
    console.error("Error al eliminar la relación PUT-Jurado:", error);
    return NextResponse.json({ error: "Error al eliminar los datos" }, { status: 500 });
  }
}
