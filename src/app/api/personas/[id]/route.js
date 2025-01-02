import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();
        
        console.log("PUT - ID recibido:", id);
        console.log("PUT - Datos recibidos:", body);

        // Verificar que el ID sea un número
        const personaId = parseInt(id, 10);
        if (isNaN(personaId)) {
            return NextResponse.json(
                { error: "ID inválido" },
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
                LDN_Per = ?, 
                Estado_Per = ? 
            WHERE Id_Persona = ?`,
            [
                body.CI_Per,
                body.Nombre_Per,
                body.Paterno_Per,
                body.Materno_Per,
                body.Sexo_Per,
                body.Direccion_Per,
                body.FDN_Per,
                body.Correo_Per,
                body.Telefono_Per,
                body.LDN_Per,
                body.Estado_Per,
                personaId
            ]
        );

        console.log("Resultado de la actualización:", result);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "No se encontró la persona" },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            message: "Actualización exitosa",
            result: result
        });
    } catch (error) {
        console.error("Error completo:", error);
        return NextResponse.json(
            { 
                error: "Error al actualizar persona", 
                details: error.message,
                sqlMessage: error.sqlMessage 
            },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        const result = await query(
            'DELETE FROM TbPersona WHERE Id_Persona = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { error: "No se encontró la persona" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Eliminación exitosa" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        return NextResponse.json(
            { error: "Error al eliminar persona", details: error.message },
            { status: 500 }
        );
    }
} 