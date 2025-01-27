import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT pj.Id_PUT_Jurado, pj.Id_PUT_Jur, pj.Id_Jurado_Jur, 
                   pj.Representante_Jur, pj.Observacion_Jur, pj.Estado_Jur,
                   p.Tema_PUT AS PUTTema,
                   j.Nombre_Jur AS JuradoNombre, j.Paterno_Jur AS JuradoPaterno, j.Materno_Jur AS JuradoMaterno
            FROM TbPUT_Jurado pj
            INNER JOIN TbPersonaUniversidadTitulo p ON pj.Id_PUT_Jur = p.Id_PUT
            INNER JOIN TbJurado j ON pj.Id_Jurado_Jur = j.Id_Jurado
            WHERE pj.Estado_Jur = 'AC'
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error al obtener las relaciones PUT-Jurado:", error);
        return NextResponse.json({ error: "Error al obtener los datos" }, { status: 500 });
    }
}


 
export async function POST(request) {
    try {
        const { Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur } = await request.json();

        if (!Id_PUT_Jur || !Id_Jurado_Jur || !Representante_Jur) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
        }

        const [result] = await pool.query(`
            INSERT INTO TbPUT_Jurado (Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur, Estado_Jur)
            VALUES (?, ?, ?, ?, 'AC')
        `, [Id_PUT_Jur, Id_Jurado_Jur, Representante_Jur, Observacion_Jur || null]);

        return NextResponse.json({ message: "Relación PUT-Jurado creada exitosamente", id: result.insertId });
    } catch (error) {
        console.error("Error al crear la relación PUT-Jurado:", error);
        return NextResponse.json({ error: "Error al crear la relación" }, { status: 500 });
    }
}
