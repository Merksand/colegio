import { query, pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

        const {
            CI_Per,
            Nombre_Per,
            Paterno_Per,
            Materno_Per,
            Sexo_Per,
            Direccion_Per,
            FDN_Per,
            Correo_Per,
            Telefono_Per,
            LDN_Per,
        } = body;

        // Validar que todos los campos obligatorios están presentes
        if (
            !CI_Per ||
            !Nombre_Per ||
            !Paterno_Per ||
            !Sexo_Per ||
            !Direccion_Per ||
            !FDN_Per ||
            !Correo_Per ||
            !Telefono_Per
        ) {
            return NextResponse.json(
                { error: "Todos los campos obligatorios deben estar presentes" },
                { status: 400 }
            );
        }

        const result = await query(
            `UPDATE TbPersona SET 
                CI_Per = ?, 
                Nombre_Per = ?, 
                Paterno_Per = ?, 
                Materno_Per = ?, 
                Sexo_Per = ?, 
                Direccion_Per = ?, 
                FDN_Per = ?, 
                Correo_Per = ?, 
                Telefono_Per = ?, 
                LDN_Per = ? 
            WHERE Id_Persona = ?`,
            [
                CI_Per,
                Nombre_Per,
                Paterno_Per,
                Materno_Per,
                Sexo_Per,
                Direccion_Per,
                FDN_Per,
                Correo_Per,
                Telefono_Per,
                LDN_Per,
                id,
            ]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "Persona no encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Persona actualizada exitosamente" });
    } catch (error) {
        console.error("Error al actualizar persona:", error);
        return NextResponse.json(
            { error: "Error interno del servidor", details: error.message },
            { status: 500 }
        );
    }
}


export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const [rows] = await pool.query('SELECT * FROM TbPersona WHERE CI_Per = ?', [id]);

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const result = await query('UPDATE TbPersona SET Estado_Per = "BA" WHERE Id_Persona = ?', [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Persona eliminada exitosamente' });
    } catch (error) {
        console.error("Error completo:", error);
        return NextResponse.json(
            {
                error: "Error al eliminar persona",
                details: error.message,
                errorTodo: error,
                sqlMessage: error.sqlMessage
            },
            { status: 500 }
        );
    }
}