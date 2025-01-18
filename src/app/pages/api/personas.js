import { query } from '../../lib/db';

export default async function handler(req, res) {
  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const personas = await query('SELECT * FROM TbPersona');
        res.status(200).json(personas);
        break;
      }
      case 'POST': {
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
          Estado_Per,
        } = req.body;

        const result = await query(
          'INSERT INTO TbPersona (CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [CI_Per, Nombre_Per, Paterno_Per, Materno_Per, Sexo_Per, Direccion_Per, FDN_Per, Correo_Per, Telefono_Per, LDN_Per, Estado_Per]
        );

        res.status(201).json(result);
        break;
      }
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
