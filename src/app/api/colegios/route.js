import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM TbColegio WHERE Estado_Col = 'AC'");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error al obtener los colegios:", error);
    return NextResponse.json({ error: "Error al obtener los colegios" }, { status: 500 });
  }
}



export async function POST(request) {
  try {
    const { Nombre_Col } = await request.json();

    // Validar datos
    if (!Nombre_Col) {
      return NextResponse.json({ error: "El nombre del colegio es requerido" }, { status: 400 });
    }

    const [result] = await pool.query(
      "INSERT INTO TbColegio (Nombre_Col, Estado_Col) VALUES (?, 'AC')",
      [Nombre_Col]
    );

    return NextResponse.json({ message: "Colegio creado exitosamente", id: result.insertId });
  } catch (error) {
    console.error("Error al crear el colegio:", error);
    return NextResponse.json({ error: "Error al crear el colegio" }, { status: 500 });
  }
}
