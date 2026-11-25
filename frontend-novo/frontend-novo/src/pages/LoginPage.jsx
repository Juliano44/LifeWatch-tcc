import { useState } from 'react';
import {
  PiEnvelopeSimpleBold,
  PiLockKeyBold,
  PiUserBold,
  PiEyeBold,
  PiEyeSlashBold,
  PiWarningCircleFill,
  PiMoonFill,
  PiSunFill,
} from 'react-icons/pi';
import logo from '../assets/logo.png';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const DEMO_EMAIL = 'adriana@demo.com';
const DEMO_PASSWORD = 'demo1234';

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isRegister = mode === 'register';

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError('');
  };

  const validate = () => {
    if (isRegister && !name.trim()) return 'Informe seu nome.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Informe um e-mail válido.';
    if (password.length < 6) return 'A senha deve ter ao menos 6 caracteres.';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      if (isRegister) {
        await signUp(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }
      // Em caso de sucesso o App troca automaticamente para o dashboard.
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  const fillDemo = () => {
    setMode('login');
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError('');
  };

  return (
    <main className="login">
      <button
        type="button"
        className="login__theme"
        onClick={toggleTheme}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      >
        {isDark ? <PiSunFill aria-hidden="true" /> : <PiMoonFill aria-hidden="true" />}
      </button>
      <div className="login__card">
        <div className="login__brand">
          <img className="login__logo" src={logo} alt="Logotipo do painel de saúde" />
          <h1 className="login__title">{isRegister ? 'Criar conta' : 'Bem-vindo(a)'}</h1>
          <p className="login__subtitle">
            {isRegister
              ? 'Cadastre-se para acompanhar sua saúde e bem-estar.'
              : 'Entre para acessar seu painel de saúde.'}
          </p>
        </div>

        <div className="login__tabs" role="tablist" aria-label="Acesso">
          <button
            type="button"
            role="tab"
            aria-selected={!isRegister}
            className={`login__tab ${!isRegister ? 'login__tab--active' : ''}`}
            onClick={() => switchMode('login')}
          >
            Entrar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isRegister}
            className={`login__tab ${isRegister ? 'login__tab--active' : ''}`}
            onClick={() => switchMode('register')}
          >
            Criar conta
          </button>
        </div>

        <form className="login__form" onSubmit={handleSubmit} noValidate>
          {isRegister && (
            <label className="field">
              <span className="field__label">Nome</span>
              <span className="field__control">
                <PiUserBold className="field__icon" aria-hidden="true" />
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
            </label>
          )}

          <label className="field">
            <span className="field__label">E-mail</span>
            <span className="field__control">
              <PiEnvelopeSimpleBold className="field__icon" aria-hidden="true" />
              <input
                type="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
          </label>

          <label className="field">
            <span className="field__label">Senha</span>
            <span className="field__control">
              <PiLockKeyBold className="field__icon" aria-hidden="true" />
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                placeholder="Mínimo de 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="field__toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showPassword ? <PiEyeSlashBold /> : <PiEyeBold />}
              </button>
            </span>
          </label>

          {error && (
            <p className="login__error" role="alert">
              <PiWarningCircleFill aria-hidden="true" />
              {error}
            </p>
          )}

          <button className="login__submit" type="submit" disabled={submitting}>
            {submitting ? 'Aguarde…' : isRegister ? 'Criar conta' : 'Entrar'}
          </button>
        </form>

        {!isRegister && (
          <button className="login__demo" type="button" onClick={fillDemo}>
            Usar conta de demonstração
          </button>
        )}

        <p className="login__note">Dados fictícios, apenas para demonstração do TCC.</p>
      </div>
    </main>
  );
}

export default LoginPage;
