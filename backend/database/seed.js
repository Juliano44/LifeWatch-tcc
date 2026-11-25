// Cria (ou atualiza) a conta de demonstração e preenche 7 dias de dados.
// Uso: npm run db:seed

import dotenv from 'dotenv';
import pool from '../src/config/database.js';
import { hashPassword } from '../src/utils/password.js';
import { seedDemoData } from '../src/utils/demoData.js';

dotenv.config({ quiet: true });

const DEMO_USER = {
  name: 'Adriana',
  email: 'adriana@demo.com',
  password: 'demo1234',
  initials: 'A',
};

async function seed() {
  try {
    const passwordHash = await hashPassword(DEMO_USER.password);

    await pool.query(
      `INSERT INTO users (name, email, password_hash, avatar_initials)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE name = VALUES(name), password_hash = VALUES(password_hash),
        avatar_initials = VALUES(avatar_initials)`,
      [DEMO_USER.name, DEMO_USER.email, passwordHash, DEMO_USER.initials]
    );

    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [DEMO_USER.email]);
    await seedDemoData(rows[0].id);

    console.log('Dados de demonstração criados com sucesso.');
    console.log(`  E-mail: ${DEMO_USER.email}`);
    console.log(`  Senha:  ${DEMO_USER.password}`);
  } catch (error) {
    console.error('Erro ao popular o banco:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
