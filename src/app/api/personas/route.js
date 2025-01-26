import { pool, query } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const personas = await query("SELECT * FROM TbPersona WHERE Estado_Per = 'AC'");
        console.log("Personas obtenidas:", personas);
        return NextResponse.json(personas);
    } catch (error) {
        console.error("Error completo:", error);
        return NextResponse.json(
            { 
                error: "Error al obtener personas",
                details: error.message,
                sqlMessage: error.sqlMessage 
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
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
            Estado_Per = "AC",
        } = body;

        const result = await query(
            "INSERT INTO TbPersona (CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
                Estado_Per,
            ]
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Error al crear persona" },
            { status: 500 }
        );
    }
}
