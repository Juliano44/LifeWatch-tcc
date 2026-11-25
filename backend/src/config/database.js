import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3307,
  user: process.env.DB_USER || 'senai',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'dashboard_saude',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Conectado ao MariaDB com sucesso.');
    connection.release();
  } catch (error) {
    // Node às vezes agrupa falhas de conexão em um AggregateError (tentativa
    // simultânea por IPv6 e IPv4 quando o host é "localhost"), cujo .message
    // costuma vir vazio — o motivo real está em error.errors.
    console.error('Falha ao conectar ao MariaDB.');
    console.error('  code:', error.code);
    console.error('  message:', error.message || '(vazio)');
    if (Array.isArray(error.errors)) {
      error.errors.forEach((e, i) => console.error(`  causa ${i + 1}:`, e.code, e.message));
    }
    console.error(
      '\nVerifique: 1) o serviço do MariaDB está rodando; 2) a porta no .env bate com a porta real (padrão do XAMPP/instalação avulsa costuma ser 3306, não 3307); 3) tente DB_HOST=127.0.0.1 em vez de "localhost".'
    );
    throw error;
  }
}

export default pool;
