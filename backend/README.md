# Backend — Dashboard de Saúde

API em **Node.js + Express 5 + MariaDB** (mysql2, JWT, bcrypt, Swagger).

O passo a passo completo (banco, `.env`, como rodar) está no
[`README.md` da raiz do projeto](../README.md).

Comandos:

| Comando | O que faz |
|---|---|
| `npm run db:migrate` | cria o banco `dashboard_saude` e as tabelas |
| `npm run db:seed` | cria a conta `adriana@demo.com` / `demo1234` com 7 dias de dados |
| `npm run db:setup` | os dois acima, em sequência |
| `npm run dev` | sobe a API em http://localhost:3001 (reinicia ao salvar) |

Estrutura: `src/routes` → `src/controllers` → `src/models` (SQL) ·
`src/utils/formatters.js` converte as linhas do banco para o formato do front ·
`src/utils/demoData.js` gera os dados fictícios.
