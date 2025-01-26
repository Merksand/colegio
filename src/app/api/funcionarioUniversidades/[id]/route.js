import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(`
            SELECT fu.Id_FuncionarioUniversidad, fu.Id_Funcionario_FU, fu.Id_Universidad_FU, 
                   fu.Fecha_Ini_FU, fu.Fecha_Fin_FU, fu.Observacion_FU, fu.Estado_FU,
                   f.Nombre_Fun AS FuncionarioNombre, 
                   u.Nombre_Uni AS UniversidadNombre
            FROM TbFuncionarioUniversidad fu
            INNER JOIN TbFuncionario f ON fu.Id_Funcionario_FU = f.Id_Funcionario
            INNER JOIN TbUniversidad u ON fu.Id_Universidad_FU = u.Id_Universidad
            WHERE fu.Id_FuncionarioUniversidad = ?
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
    const { Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU, Observacion_FU } = await request.json();

    if (!Id_Funcionario_FU || !Id_Universidad_FU || !Fecha_Ini_FU) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [result] = await pool.query(`
            UPDATE TbFuncionarioUniversidad
            SET Id_Funcionario_FU = ?, Id_Universidad_FU = ?, Fecha_Ini_FU = ?, Fecha_Fin_FU = ?, Observacion_FU = ?
            WHERE Id_FuncionarioUniversidad = ?
        `, [Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU || null, Observacion_FU, params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Funcionario-Universidad actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la relación:", error);
    return NextResponse.json({ error: "Error al actualizar los datos" }, { status: 500 });
  }
}




export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query(`
            UPDATE TbFuncionarioUniversidad
            SET Estado_FU = 'BA'
            WHERE Id_FuncionarioUniversidad = ?
        `, [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Funcionario-Universidad eliminada lógicamente" });
  } catch (error) {
    console.error("Error al eliminar la relación:", error);
    return NextResponse.json({ error: "Error al eliminar los datos" }, { status: 500 });
  }
}
