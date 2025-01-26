import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todos los funcionarios o uno específico por CI
export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM TbFuncionario');
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Dato no encontrado' },
        { status: 404 });
    }
  
    return NextResponse.json(rows);
    
  } catch (error) {
    console.error(error);
  }
}


// POST - Crear un nuevo funcionario
export async function POST(request) {
  try {
    const data = await request.json();
    const {
      CI_Funcionario,
      Grado_Academico_Fun,
      Nombre_Fun,
      Paterno_Fun,
      Materno_Fun,
      Sexo_Fun,
      FDN_Fun,
      Correo_Fun,
      Telefono_Fun,
      LDN_Fun,
      Estado_Fun = 'AC'
    } = data;

    // Verificar que los datos requeridos estén presentes
    if (!CI_Funcionario || !Nombre_Fun || !Paterno_Fun || !FDN_Fun) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios', details: data },
        { status: 400 }
      );
    }

    // Verificar si ya existe un funcionario con el mismo CI
    const [existingFuncionario] = await pool.query(
      'SELECT * FROM TbFuncionario WHERE CI_Funcionario = ?',
      [CI_Funcionario]
    );

    if (existingFuncionario.length > 0) {
      return NextResponse.json(
        { error: 'Ya existe un funcionario con el mismo CI' },
        { status: 400 }
      );
    }

    // Crear el funcionario
    const [result] = await pool.query(
      `INSERT INTO TbFuncionario (CI_Funcionario, Grado_Academico_Fun, Nombre_Fun, Paterno_Fun, Materno_Fun, Sexo_Fun, FDN_Fun, Correo_Fun, Telefono_Fun, LDN_Fun, Estado_Fun) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        CI_Funcionario,
        Grado_Academico_Fun,
        Nombre_Fun,
        Paterno_Fun,
        Materno_Fun,
        Sexo_Fun,
        FDN_Fun,
        Correo_Fun,
        Telefono_Fun,
        LDN_Fun,
        Estado_Fun
      ]
    );

    return NextResponse.json(
      {
        message: 'Funcionario creado correctamente',
        data: {
          Id_Funcionario: result.insertId,
          CI_Funcionario,
          Nombre_Fun,
          Paterno_Fun,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el funcionario:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear el funcionario' },
      { status: 500 }
    );
  }
}
