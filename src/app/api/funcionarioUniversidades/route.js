import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(`
            SELECT fu.Id_FuncionarioUniversidad, fu.Id_Funcionario_FU, fu.Id_Universidad_FU, 
                   fu.Fecha_Ini_FU, fu.Fecha_Fin_FU, fu.Observacion_FU, fu.Estado_FU,
                   f.Nombre_Fun AS FuncionarioNombre, 
                   f.Paterno_Fun AS FuncionarioPaterno, 
                   u.Nombre_Uni AS UniversidadNombre
            FROM TbFuncionarioUniversidad fu
            INNER JOIN TbFuncionario f ON fu.Id_Funcionario_FU = f.Id_Funcionario
            INNER JOIN TbUniversidad u ON fu.Id_Universidad_FU = u.Id_Universidad
            WHERE fu.Estado_FU = 'AC'
        `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener las relaciones Funcionario-Universidad:", error);
    return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU, Observacion_FU } = await request.json();

    if (!Id_Funcionario_FU || !Id_Universidad_FU || !Fecha_Ini_FU) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const [result] = await pool.query(`
            INSERT INTO TbFuncionarioUniversidad (Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU, Observacion_FU, Estado_FU)
            VALUES (?, ?, ?, ?, ?, 'AC')
        `, [Id_Funcionario_FU, Id_Universidad_FU, Fecha_Ini_FU, Fecha_Fin_FU || null, Observacion_FU]);

    return NextResponse.json({ message: "Relación Funcionario-Universidad creada exitosamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear la relación Funcionario-Universidad:", error);
    return NextResponse.json({ error: "Error al crear la relación" }, { status: 500 });
  }
}
