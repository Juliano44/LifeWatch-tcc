import { useCallback, useEffect, useState } from 'react';
import * as api from '../services/api';

// Busca resumo + tendências do backend para o usuário logado.
// `onUnauthorized` é chamado se o token expirou (resposta 401).
export function useHealthData(onUnauthorized) {
  const [summary, setSummary] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryData, trendsData] = await Promise.all([
        api.fetchSummary(),
        api.fetchTrends(7),
      ]);
      setSummary(summaryData);
      setTrends(trendsData);
    } catch (err) {
      if (err.status === 401) {
        onUnauthorized?.();
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    load();
  }, [load]);

  return { summary, trends, loading, error, reload: load };
}
