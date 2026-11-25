// Camada de comunicação com o backend (Node + Express).
// Todas as chamadas à API passam por aqui — os componentes nunca usam
// fetch diretamente.

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const TOKEN_KEY = 'saude.token';

// ---------- Token (localStorage) ----------
export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    /* navegador sem localStorage: o login vale apenas até recarregar a página */
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* nada a fazer */
  }
}

// ---------- Requisição base ----------
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const authToken = token ?? getStoredToken();
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(
      'Não foi possível conectar ao servidor. Verifique se o backend está rodando.',
      0
    );
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    /* resposta sem corpo JSON */
  }

  if (!response.ok) {
    const firstValidationError = data?.errors?.[0]?.msg;
    throw new ApiError(
      firstValidationError || data?.message || 'Erro inesperado ao falar com o servidor.',
      response.status
    );
  }

  return data;
}

// ---------- Autenticação ----------
export const login = (email, password) =>
  request('/auth/login', { method: 'POST', body: { email, password } });

export const register = (name, email, password) =>
  request('/auth/register', { method: 'POST', body: { name, email, password } });

export const fetchMe = (token) => request('/auth/me', { token });

// ---------- Dados de saúde ----------
export const fetchSummary = () => request('/health/summary');
export const fetchTrends = (days = 7) => request(`/health/trends?days=${days}`);
