import dotenv from 'dotenv';
import app from './app.js';
import { testConnection } from './config/database.js';

dotenv.config({ quiet: true });

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`Documentação da API em http://localhost:${PORT}/api/docs`);
    });
  } catch (error) {
    console.error('Não foi possível iniciar o servidor:', error.message);
    process.exit(1);
  }
}

start();
