import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Sem usuário logado mostra o login; com usuário logado mostra o dashboard.
function App() {
  const { user, checking, signOut } = useAuth();

  if (checking) {
    return (
      <div className="app__fullscreen" role="status">
        Carregando…
      </div>
    );
  }

  if (!user) return <LoginPage />;

  return <DashboardPage user={user} onSignOut={signOut} />;
}

export default App;
