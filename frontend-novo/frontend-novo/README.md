# Frontend — Dashboard de Saúde

React + Vite. Passo a passo completo no
[`README.md` da raiz do projeto](../README.md).

```bash
npm install
npm run dev
```

O endereço da API fica em `.env` (`VITE_API_URL`, padrão
`http://localhost:3001/api`; veja `.env.example`).

Principais pastas: `src/pages` (Login e Dashboard) · `src/services/api.js`
(todas as chamadas ao backend) · `src/context/AuthContext.jsx` (sessão) ·
`src/hooks/useHealthData.js` · `src/utils/trends.js` (monta as Tendências).
