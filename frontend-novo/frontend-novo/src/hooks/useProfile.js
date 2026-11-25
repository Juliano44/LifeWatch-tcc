import { useCallback, useMemo, useState } from 'react';

// Dados extras do perfil. O backend atual só guarda nome, e-mail e senha,
// então estes campos ficam salvos neste navegador, separados por usuário.
export const EMPTY_PROFILE = {
  displayName: '',
  photo: '',
  birthDate: '',
  height: '',
  weight: '',
  bloodType: '',
  goal: '',
  emergencyName: '',
  emergencyPhone: '',
};

function storageKey(user) {
  return `saude.profile.${user?.id ?? user?.email ?? 'anon'}`;
}

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...EMPTY_PROFILE, ...JSON.parse(raw) } : { ...EMPTY_PROFILE };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function useProfile(user) {
  const key = storageKey(user);
  const [profile, setProfile] = useState(() => load(key));

  const saveProfile = useCallback(
    (next) => {
      const merged = { ...EMPTY_PROFILE, ...next };
      try {
        localStorage.setItem(key, JSON.stringify(merged));
      } catch {
        throw new Error('Não foi possível salvar. O armazenamento do navegador está cheio ou bloqueado.');
      }
      setProfile(merged);
    },
    [key]
  );

  const name = useMemo(
    () => profile.displayName.trim() || user?.name || '',
    [profile.displayName, user?.name]
  );

  return { profile, saveProfile, name };
}

export function calcAge(birthDate) {
  if (!birthDate) return null;
  const born = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(born.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - born.getFullYear();
  const hadBirthday =
    today.getMonth() > born.getMonth() ||
    (today.getMonth() === born.getMonth() && today.getDate() >= born.getDate());
  if (!hadBirthday) age -= 1;
  return age >= 0 && age < 130 ? age : null;
}

export function calcBmi(heightCm, weightKg) {
  const h = Number(heightCm) / 100;
  const w = Number(weightKg);
  if (!h || !w) return null;
  return w / (h * h);
}
