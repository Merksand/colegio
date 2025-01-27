import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT jc.Id_JuradoColegio, jc.Id_Jurado_JC, jc.Id_Colegio_JC, jc.Fecha_Ini_JC, 
                   jc.Fecha_Fin_JC, jc.Observacion_JC, jc.Estado_FCC, 
                   j.Nombre_Jur AS NombreJurado,j.Paterno_Jur AS JuradoPaterno, j.Materno_Jur AS JuradoMaterno , c.Nombre_Col AS NombreColegio
            FROM TbJuradoColegio jc
            INNER JOIN TbJurado j ON jc.Id_Jurado_JC = j.Id_Jurado
            INNER JOIN TbColegio c ON jc.Id_Colegio_JC = c.Id_Colegio
            WHERE jc.Estado_FCC = 'AC' order by j.Nombre_Jur
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error al obtener las relaciones Jurado-Colegio:", error);
        return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
    }
}


export async function POST(request) {
    try {
        const { Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC, Fecha_Fin_JC, Observacion_JC } = await request.json();

        if (!Id_Jurado_JC || !Id_Colegio_JC || !Fecha_Ini_JC) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            INSERT INTO TbJuradoColegio (Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC, Fecha_Fin_JC, Observacion_JC, Estado_FCC)
            VALUES (?, ?, ?, ?, ?, 'AC')
        `, [Id_Jurado_JC, Id_Colegio_JC, Fecha_Ini_JC || null, Fecha_Fin_JC || null, Observacion_JC, 'AC']);

        return NextResponse.json({ message: "Relación Jurado-Colegio creada exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear la relación Jurado-Colegio:", error);
        return NextResponse.json({ error: "Error al crear la relación" }, { status: 500 });
    }
}
