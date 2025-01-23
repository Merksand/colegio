import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Miguelangelomy1',
    database: process.env.DB_NAME || 'BD_COLEGIO1',
});

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Conexión exitosa a la base de datos');
        connection.release();
        return true;
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        return false;
    }
}

export async function query(sql, values) {
    try {
        await testConnection();
        
        const [results] = await pool.execute(sql, values || []);
        return results;
    } catch (error) {
        console.error('Error en la consulta SQL:', error);
        throw error;
    }
} 