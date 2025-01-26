import { NextResponse } from 'next/server';
import {pool} from '@/lib/db';

// Ruta: /api/jurados
export async function GET(request) {
  try {
      const [rows] = await pool.query("SELECT * FROM TbJurado WHERE Estado_Per = 'AC'");
      return NextResponse.json(rows);
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


// Ruta: /api/jurados
export async function POST(request) {
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
          LDN_Per,
          Estado_Per = 'AC'
      } = data;

      const [result] = await pool.query(
          "INSERT INTO TbJurado (CI_Jur, Grado_Academico_Jur, Nombre_Jur, Paterno_Jur, Materno_Jur, Sexo_Jur, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [CI_Jur, Grado_Academico_Jur, Nombre_Jur, Paterno_Jur, Materno_Jur, Sexo_Jur, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per]
      );

      return NextResponse.json({ message: "Jurado creado exitosamente", id: result.insertId });
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
