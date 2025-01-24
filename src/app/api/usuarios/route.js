import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

// GET - Obtener todos los usuarios con información relacionada
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const ci = searchParams.get('ci'); // CI para buscar un usuario específico

    let query = `
      SELECT 
        u.Id_Usuario,
        u.Id_Funcionario_Usu,
        f.CI_Funcionario,
        f.Nombre_Fun,
        f.Paterno_Fun,
        f.Materno_Fun,
        u.login_Usu,
        u.Estado_Usu,
        pu.Id_Password_UP,
        pa.Tipo_Pas,
        pa.Fecha_Pas
      FROM 
        tbUsuario u
        JOIN TbFuncionario f ON u.Id_Funcionario_Usu = f.Id_Funcionario
        LEFT JOIN tbUsuarioPassword pu ON u.Id_Usuario = pu.Id_Usuario_UP
        LEFT JOIN tbPassword pa ON pu.Id_Password_UP = pa.Id_Password
    `;

    const params = [];

    // Si se pasa el CI, filtrar por CI del funcionario
    if (ci) {
      query += ` WHERE f.CI_Funcionario = ?`;
      params.push(ci);
    }

    const [rows] = await pool.query(query, params);

    if (ci && rows.length === 0) {
      return NextResponse.json(
        { error: 'No se encontró un usuario con el CI proporcionado' },
        { status: 404 }
      );
    }

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener los usuarios' },
      { status: 500 }
    );
  }
}

// POST - Crear un usuario
export async function POST(request) {
  try {
    const data = await request.json();
    const { Id_Funcionario, Usuario, Estado_Usu = 'AC' } = data;

    // Verificar que los datos requeridos estén presentes
    if (!Id_Funcionario || !Usuario) {
      return NextResponse.json(
        { error: 'Faltan datos obligatorios', details: data },
        { status: 400 }
      );
    }

    // Verificar si el funcionario ya tiene una cuenta
    const [existingUser] = await pool.query(
      'SELECT * FROM tbUsuario WHERE Id_Funcionario_Usu = ?',
      [Id_Funcionario]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'El funcionario ya tiene una cuenta registrada' },
        { status: 400 }
      );
    }

    // Generar una contraseña aleatoria
    const randomPassword = crypto.randomBytes(8).toString('hex');

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Crear el usuario
    const [userResult] = await pool.query(
      `INSERT INTO tbUsuario (Id_Funcionario_Usu, login_Usu, Estado_Usu) 
       VALUES (?, ?, ?)`,
      [Id_Funcionario, Usuario, Estado_Usu]
    );

    // Obtener el ID del usuario creado
    const userId = userResult.insertId;

    // Insertar la contraseña en la tabla de contraseñas
    const [passwordResult] = await pool.query(
      `INSERT INTO tbPassword (Tipo_Pas, Password_Pas, Estado_Pas) 
       VALUES (?, ?, ?)`,
      ['GE', hashedPassword, 'AC']
    );

    // Obtener el ID de la contraseña creada
    const passwordId = passwordResult.insertId;

    // Relacionar el usuario con la contraseña
    await pool.query(
      `INSERT INTO tbUsuarioPassword (Id_Usuario_UP, Id_Password_UP) 
       VALUES (?, ?)`,
      [userId, passwordId]
    );

    return NextResponse.json(
      {
        message: 'Usuario creado correctamente',
        data: {
          Id_Funcionario,
          Usuario,
          Password: randomPassword, // Devuelve la contraseña generada para mostrarla una vez
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return NextResponse.json(
      { error: error.message || 'Error al crear el usuario' },
      { status: 500 }
    );
  }
}
