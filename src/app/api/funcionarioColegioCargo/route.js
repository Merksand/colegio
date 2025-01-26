import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
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
            WHERE fcc.Estado_FCC = 'AC'
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error al obtener las relaciones Funcionario-Colegio-Cargo:", error);
        return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
    }
}
 
export async function POST(request) {
    try {
        const { Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC } = await request.json();

        if (!Id_Funcionario_FCC || !Id_Colegio_FCC || !Id_Cargo_FCC || !Fec_Inicio_FCC) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            INSERT INTO TbFuncionarioColegioCargo (Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC, Estado_FCC)
            VALUES (?, ?, ?, ?, ?, 'AC')
        `, [Id_Funcionario_FCC, Id_Colegio_FCC, Id_Cargo_FCC, Fec_Inicio_FCC, Fec_Fin_FCC || null]);

        return NextResponse.json({ message: "Relación Funcionario-Colegio-Cargo creada exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear la relación Funcionario-Colegio-Cargo:", error);
        return NextResponse.json({ error: "Error al crear la relación" }, { status: 500 });
    }
}
