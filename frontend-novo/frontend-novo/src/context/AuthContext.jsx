import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // "checking" = ainda validando um token salvo de uma visita anterior
  const [checking, setChecking] = useState(Boolean(api.getStoredToken()));

  // Ao abrir o site, se existe um token salvo, confirma com o backend
  // que ele ainda é válido e carrega os dados do usuário.
  useEffect(() => {
    const token = api.getStoredToken();
    if (!token) return;

    let cancelled = false;
    api
      .fetchMe(token)
      .then(({ user: me }) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => {
        api.clearToken();
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { user: loggedUser, token } = await api.login(email, password);
    api.storeToken(token);
    setUser(loggedUser);
  }, []);

  const signUp = useCallback(async (name, email, password) => {
    const { user: newUser, token } = await api.register(name, email, password);
    api.storeToken(token);
    setUser(newUser);
  }, []);

  const signOut = useCallback(() => {
    api.clearToken();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, checking, signIn, signUp, signOut }),
    [user, checking, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de <AuthProvider>.');
  return context;
}
