import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';


// Ruta: /api/jurados/[id]
export async function GET(request, { params }) {
  try {
    const [rows] = await pool.query("SELECT * FROM TbJurado WHERE Id_Jurado = ?", [params.id]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Jurado no encontrado" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Ruta: /api/jurados/[id]
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const {
      CI_Jur,
      Grado_Academico_Jur,
      Nombre_Jur,
      Paterno_Jur,
      Materno_Jur,
      Sexo_Jur,
      FDN_Per,
      Correo_Per,
      Telefono_Per,
      LDN_Per
    } = data;

    const [result] = await pool.query(
      "UPDATE TbJurado SET CI_Jur = ?, Grado_Academico_Jur = ?, Nombre_Jur = ?, Paterno_Jur = ?, Materno_Jur = ?, Sexo_Jur = ?, FDN_Per = ?, Correo_Per = ?, Telefono_Per = ?, LDN_Per = ? WHERE Id_Jurado = ?",
      [CI_Jur, Grado_Academico_Jur, Nombre_Jur, Paterno_Jur, Materno_Jur, Sexo_Jur, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Jurado no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Jurado actualizado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



// Ruta: /api/jurados/[id]
export async function DELETE(request, { params }) {
  try {
    const [result] = await pool.query("DELETE FROM TbJurado WHERE Id_Jurado = ?", [params.id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Jurado no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Jurado eliminado exitosamente" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
