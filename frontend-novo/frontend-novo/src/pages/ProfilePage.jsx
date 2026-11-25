import { useRef, useState } from 'react';
import {
  PiCameraFill,
  PiTrashFill,
  PiMoonFill,
  PiSunFill,
  PiCheckCircleFill,
  PiWarningCircleFill,
} from 'react-icons/pi';
import { useTheme } from '../context/ThemeContext';
import { calcAge, calcBmi } from '../hooks/useProfile';
import './ProfilePage.css';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const GOALS = [
  'Dormir melhor',
  'Ficar mais ativo(a)',
  'Reduzir o estresse',
  'Cuidar do coração',
  'Acompanhar minha saúde em geral',
];

const todayIso = () => new Date().toISOString().slice(0, 10);

// Recorta o centro da foto em quadrado e reduz para 256 px (a imagem fica leve no navegador).
function fileToAvatar(file, size = 256) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Escolha um arquivo de imagem (JPG, PNG ou WebP).'));
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      canvas
        .getContext('2d')
        .drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Não foi possível ler essa imagem. Tente outro arquivo.'));
    };
    img.src = url;
  });
}

function validate(d) {
  const errors = {};
  if (d.displayName.length > 80) errors.displayName = 'Use no máximo 80 caracteres.';
  if (d.birthDate) {
    if (d.birthDate > todayIso()) errors.birthDate = 'A data não pode estar no futuro.';
    else if (d.birthDate < '1900-01-01') errors.birthDate = 'Informe uma data a partir de 1900.';
  }
  if (d.height !== '' && (Number(d.height) < 50 || Number(d.height) > 260))
    errors.height = 'Informe a altura entre 50 e 260 cm.';
  if (d.weight !== '' && (Number(d.weight) < 10 || Number(d.weight) > 500))
    errors.weight = 'Informe o peso entre 10 e 500 kg.';
  if (d.emergencyPhone && d.emergencyPhone.replace(/\D/g, '').length < 8)
    errors.emergencyPhone = 'Informe o telefone com DDD.';
  return errors;
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="pf-field">
      <label className="pf-field__label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="pf-field__error" id={`${id}-msg`} role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p className="pf-field__hint" id={`${id}-msg`}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function ProfilePage({ user, profile, saveProfile }) {
  const { isDark, setTheme } = useTheme();
  const fileRef = useRef(null);
  const [draft, setDraft] = useState(profile);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null); // { type: 'ok' | 'error', text }

  const dirty = JSON.stringify(draft) !== JSON.stringify(profile);
  const shownName = draft.displayName.trim() || user.name;
  const initials = user.avatar_initials || shownName?.[0]?.toUpperCase() || '?';
  const age = calcAge(draft.birthDate);
  const bmi = calcBmi(draft.height, draft.weight);

  const set = (field) => (event) => {
    setDraft((d) => ({ ...d, [field]: event.target.value }));
    setFeedback(null);
  };

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const photo = await fileToAvatar(file);
      setDraft((d) => ({ ...d, photo }));
      setFeedback(null);
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const found = validate(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setFeedback({ type: 'error', text: 'Corrija os campos destacados para salvar.' });
      return;
    }
    try {
      saveProfile({ ...draft, displayName: draft.displayName.trim() });
      setFeedback({ type: 'ok', text: 'Alterações salvas neste dispositivo.' });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    }
  };

  const handleDiscard = () => {
    setDraft(profile);
    setErrors({});
    setFeedback(null);
  };

  return (
    <form className="profile-page" onSubmit={handleSave} noValidate>
      <section className="pf-card pf-identity" aria-label="Foto e identificação">
        <div className="pf-avatar">
          {draft.photo ? (
            <img src={draft.photo} alt={`Foto de ${shownName}`} />
          ) : (
            <span aria-hidden="true">{initials}</span>
          )}
        </div>

        <div className="pf-identity__info">
          <h2 className="pf-identity__name">{shownName}</h2>
          <p className="pf-identity__email">{user.email}</p>
          {(age !== null || bmi) && (
            <p className="pf-identity__chips">
              {age !== null && <span className="pf-chip">{age} anos</span>}
              {bmi && (
                <span className="pf-chip">
                  IMC {bmi.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}
                </span>
              )}
            </p>
          )}
          <div className="pf-identity__actions">
            <button type="button" className="pf-btn pf-btn--ghost" onClick={() => fileRef.current?.click()}>
              <PiCameraFill aria-hidden="true" />
              {draft.photo ? 'Trocar foto' : 'Adicionar foto'}
            </button>
            {draft.photo && (
              <button
                type="button"
                className="pf-btn pf-btn--ghost pf-btn--danger"
                onClick={() => setDraft((d) => ({ ...d, photo: '' }))}
              >
                <PiTrashFill aria-hidden="true" />
                Remover foto
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="visually-hidden"
              onChange={handlePhoto}
              aria-label="Escolher foto de perfil"
              tabIndex={-1}
            />
          </div>
        </div>
      </section>

      <section className="pf-card" aria-labelledby="pf-personal">
        <h3 className="pf-card__title" id="pf-personal">
          Dados pessoais
        </h3>
        <div className="pf-grid">
          <Field id="pf-name" label="Nome de exibição" error={errors.displayName}>
            <input
              id="pf-name"
              className="pf-input"
              type="text"
              autoComplete="name"
              placeholder={user.name}
              value={draft.displayName}
              onChange={set('displayName')}
              aria-describedby="pf-name-msg"
            />
          </Field>

          <Field id="pf-email" label="E-mail" hint="O e-mail pertence à conta e não pode ser alterado aqui.">
            <input
              id="pf-email"
              className="pf-input"
              type="email"
              value={user.email || ''}
              readOnly
              aria-describedby="pf-email-msg"
            />
          </Field>

          <Field id="pf-birth" label="Data de nascimento" error={errors.birthDate}>
            <input
              id="pf-birth"
              className="pf-input"
              type="date"
              max={todayIso()}
              value={draft.birthDate}
              onChange={set('birthDate')}
              aria-describedby="pf-birth-msg"
            />
          </Field>

          <Field id="pf-blood" label="Tipo sanguíneo">
            <select id="pf-blood" className="pf-input" value={draft.bloodType} onChange={set('bloodType')}>
              <option value="">Não informado</option>
              {BLOOD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </section>

      <section className="pf-card" aria-labelledby="pf-body">
        <h3 className="pf-card__title" id="pf-body">
          Medidas e objetivo
        </h3>
        <div className="pf-grid">
          <Field id="pf-height" label="Altura (cm)" error={errors.height}>
            <input
              id="pf-height"
              className="pf-input"
              type="number"
              inputMode="numeric"
              min="50"
              max="260"
              step="1"
              placeholder="Ex.: 168"
              value={draft.height}
              onChange={set('height')}
              aria-describedby="pf-height-msg"
            />
          </Field>

          <Field id="pf-weight" label="Peso (kg)" error={errors.weight}>
            <input
              id="pf-weight"
              className="pf-input"
              type="number"
              inputMode="decimal"
              min="10"
              max="500"
              step="0.1"
              placeholder="Ex.: 62,5"
              value={draft.weight}
              onChange={set('weight')}
              aria-describedby="pf-weight-msg"
            />
          </Field>

          <div className="pf-grid__wide">
            <Field id="pf-goal" label="Meu objetivo">
              <select id="pf-goal" className="pf-input" value={draft.goal} onChange={set('goal')}>
                <option value="">Escolher um objetivo</option>
                {GOALS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
      </section>

      <section className="pf-card" aria-labelledby="pf-emergency">
        <h3 className="pf-card__title" id="pf-emergency">
          Contato de emergência
        </h3>
        <div className="pf-grid">
          <Field id="pf-em-name" label="Nome">
            <input
              id="pf-em-name"
              className="pf-input"
              type="text"
              autoComplete="off"
              placeholder="Quem devemos avisar"
              value={draft.emergencyName}
              onChange={set('emergencyName')}
            />
          </Field>

          <Field id="pf-em-phone" label="Telefone" error={errors.emergencyPhone}>
            <input
              id="pf-em-phone"
              className="pf-input"
              type="tel"
              autoComplete="off"
              placeholder="(11) 91234-5678"
              value={draft.emergencyPhone}
              onChange={set('emergencyPhone')}
              aria-describedby="pf-em-phone-msg"
            />
          </Field>
        </div>
      </section>

      <section className="pf-card" aria-labelledby="pf-theme">
        <h3 className="pf-card__title" id="pf-theme">
          Aparência
        </h3>
        <div className="pf-theme" role="radiogroup" aria-labelledby="pf-theme">
          <button
            type="button"
            role="radio"
            aria-checked={!isDark}
            className={`pf-theme__option ${!isDark ? 'pf-theme__option--active' : ''}`}
            onClick={() => setTheme('light')}
          >
            <PiSunFill aria-hidden="true" />
            Claro
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={isDark}
            className={`pf-theme__option ${isDark ? 'pf-theme__option--active' : ''}`}
            onClick={() => setTheme('dark')}
          >
            <PiMoonFill aria-hidden="true" />
            Escuro
          </button>
        </div>
        <p className="pf-field__hint">O tema é aplicado na hora e lembrado neste dispositivo.</p>
      </section>

      <div className="pf-actions">
        {feedback && (
          <p
            className={`pf-feedback pf-feedback--${feedback.type}`}
            role={feedback.type === 'error' ? 'alert' : 'status'}
          >
            {feedback.type === 'ok' ? (
              <PiCheckCircleFill aria-hidden="true" />
            ) : (
              <PiWarningCircleFill aria-hidden="true" />
            )}
            {feedback.text}
          </p>
        )}
        <button type="button" className="pf-btn pf-btn--ghost" onClick={handleDiscard} disabled={!dirty}>
          Descartar
        </button>
        <button type="submit" className="pf-btn pf-btn--primary" disabled={!dirty}>
          Salvar alterações
        </button>
      </div>
    </form>
  );
}

export default ProfilePage;
