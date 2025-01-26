import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query(`
            SELECT fcc.Id_FCC, fcc.Id_Funcionario_FCC, fcc.Id_Colegio_FCC, fcc.Id_Cargo_FCC, 
                   fcc.Fec_Inicio_FCC, fcc.Fec_Fin_FCC, fcc.Estado_FCC,
                   f.Nombre_Fun AS FuncionarioNombre, 
                   c.Nombre_Col AS ColegioNombre, 
                   ca.Nombre_Car AS CargoNombre
            FROM TbFuncionarioColegioCargo fcc
            INNER JOIN TbFuncionario f ON fcc.Id_Funcionario_FCC = f.Id_Funcionario
            INNER JOIN TbColegio c ON fcc.Id_Colegio_FCC = c.Id_Colegio
            INNER JOIN TbCargo ca ON fcc.Id_Cargo_FCC = ca.Id_Cargo
            WHERE fcc.Id_FCC = ?
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
    const { Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC } = await request.json();

    if (!Id_Funcionario_FCC || !Id_Colegio_FCC || !Id_Cargo_FCC || !Fec_Inicio_FCC) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [result] = await pool.query(`
            UPDATE TbFuncionarioColegioCargo
            SET Id_Funcionario_FCC = ?, Id_Colegio_FCC = ?, Id_Cargo_FCC = ?, Fec_Inicio_FCC = ?, Fec_Fin_FCC = ?
            WHERE Id_FCC = ?
        `, [Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC || null, params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Funcionario-Colegio-Cargo actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la relación:", error);
    return NextResponse.json({ error: "Error al actualizar los datos" }, { status: 500 });
  }
}




export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query(`
            UPDATE TbFuncionarioColegioCargo
            SET Estado_FCC = 'BA'
            WHERE Id_FCC = ?
        `, [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Relación no encontrada" }, { status: 404 });
    }

    return NextResponse.json({ message: "Relación Funcionario-Colegio-Cargo eliminada lógicamente" });
  } catch (error) {
    console.error("Error al eliminar la relación:", error);
    return NextResponse.json({ error: "Error al eliminar los datos" }, { status: 500 });
  }
}
