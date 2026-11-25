// Executa o database/schema.sql contra o MariaDB configurado no .env
// Uso: npm run db:migrate

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3307,
    user: process.env.DB_USER || 'senai',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Executando schema.sql...');
    await connection.query(schemaSql);
    console.log('Banco de dados e tabelas criados com sucesso.');
  } catch (error) {
    console.error('Erro ao executar a migração:', error.message);
    process.exitCode = 1;
  } finally {
    await connection.end();
  }
}

migrate();
