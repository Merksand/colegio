import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

// GET - Obtener todos los funcionarios o uno específico por CI
export async function GET(request, { params  }) {
  try {
      const { id } = await params;
      const [rows] = await pool.query('SELECT * FROM TbFuncionario WHERE CI_Funcionario = ?', [id]);

      if (rows.length === 0) {
          return NextResponse.json({ error: 'Funcionario no encontrado' }, { status: 404 });
      }

      return NextResponse.json(rows[0]);
  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT - Actualizar un funcionario existente
export async function PUT(request) {
  try {
    const data = await request.json();
    const {
      Id_Funcionario,
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
    } = data;

    // Verificar que el ID del funcionario esté presente
    if (!Id_Funcionario) {
      return NextResponse.json(
        { error: 'El ID del funcionario es obligatorio' },
        { status: 400 }
      );
    }

    // Actualizar el funcionario
    const [result] = await pool.query(
      `UPDATE TbFuncionario 
       SET CI_Funcionario = ?, Grado_Academico_Fun = ?, Nombre_Fun = ?, Paterno_Fun = ?, Materno_Fun = ?, Sexo_Fun = ?, FDN_Fun = ?, Correo_Fun = ?, Telefono_Fun = ?, LDN_Fun = ?, Estado_Fun = ? 
       WHERE Id_Funcionario = ?`,
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
        Estado_Fun,
        Id_Funcionario
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se encontró el funcionario a actualizar' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Funcionario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el funcionario:', error);
    return NextResponse.json(
      { error: error.message || 'Error al actualizar el funcionario' },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar un funcionario
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id'); // ID del funcionario a eliminar

    if (!id) {
      return NextResponse.json(
        { error: 'El ID del funcionario es obligatorio' },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      'DELETE FROM TbFuncionario WHERE Id_Funcionario = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'No se encontró el funcionario a eliminar' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Funcionario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el funcionario:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar el funcionario' },
      { status: 500 }
    );
  }
}