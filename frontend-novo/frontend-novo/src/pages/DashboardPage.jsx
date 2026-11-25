import { useMemo, useState } from 'react';
import {
  PiFireFill,
  PiFlowerLotusFill,
  PiEarFill,
  PiHeartFill,
  PiBedFill,
  PiSparkleFill,
} from 'react-icons/pi';
import Sidebar from '../components/Sidebar';
import ProfileHeader from '../components/ProfileHeader';
import ActivityCard from '../components/ActivityCard';
import CycleCard from '../components/CycleCard';
import AudioCard from '../components/AudioCard';
import HeartRateCard from '../components/HeartRateCard';
import SleepCard from '../components/SleepCard';
import EmotionalStateCard from '../components/EmotionalStateCard';
import EmptyCard from '../components/EmptyCard';
import ShowAllDataBar from '../components/ShowAllDataBar';
import HealthDataModal from '../components/HealthDataModal';
import TrendsSection from '../components/TrendsSection';
import CategoryPage from '../components/CategoryPage';
import SharingPage from '../components/SharingPage';
import ProfilePage from './ProfilePage';
import { useProfile } from '../hooks/useProfile';
import { useHealthData } from '../hooks/useHealthData';
import { buildTrends } from '../utils/trends';
import '../App.css';

function DashboardPage({ user, onSignOut }) {
  const [selected, setSelected] = useState('resumo');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { profile, saveProfile, name: displayName } = useProfile(user);
  const { summary, trends, loading, error, reload } = useHealthData(onSignOut);
  const trendCards = useMemo(() => buildTrends(trends), [trends]);

  const handleSelect = (id) => {
    setSelected(id);
    setMobileOpen(false);
  };

  // Cards "fixados": cada um lê sua parte do resumo vindo do backend.
  const pinnedCards = [
    { key: 'activity', Card: ActivityCard, Icon: PiFireFill, color: '#FF7A00', title: 'Atividade' },
    {
      key: 'cycle',
      Card: CycleCard,
      Icon: PiFlowerLotusFill,
      color: '#FF5F9E',
      title: 'Acompanhamento de Ciclo',
      extra: { onOpen: () => setModalOpen(true) },
    },
    { key: 'audio', Card: AudioCard, Icon: PiEarFill, color: '#20D6C0', title: 'Níveis dos Fones de Ouvido' },
    { key: 'heartRate', Card: HeartRateCard, Icon: PiHeartFill, color: '#FF3B5C', title: 'Média de Batimentos em Repouso' },
    { key: 'sleep', Card: SleepCard, Icon: PiBedFill, color: '#8861E8', title: 'Sono' },
    { key: 'emotional', Card: EmotionalStateCard, Icon: PiSparkleFill, color: '#20D6C0', title: 'Estado Emocional' },
  ];

  const renderSummary = () => {
    if (loading && !summary) {
      return (
        <div className="app__status" role="status">
          Carregando seus dados…
        </div>
      );
    }

    if (error && !summary) {
      return (
        <div className="app__status app__status--error" role="alert">
          <p>{error}</p>
          <button className="app__retry" type="button" onClick={reload}>
            Tentar novamente
          </button>
        </div>
      );
    }

    return (
      <>
        <div className="app__pinned-header">
          <h2 className="app__pinned-title">Fixado</h2>
          <button className="app__pinned-edit" type="button">
            Editar
          </button>
        </div>

        <div className="app__cards-grid">
          {pinnedCards.map(({ key, Card, Icon, color, title, extra }) =>
            summary[key] ? (
              <Card key={key} data={summary[key]} {...extra} />
            ) : (
              <EmptyCard key={key} icon={<Icon />} iconColor={color} title={title} />
            )
          )}
        </div>

        <ShowAllDataBar onClick={() => setModalOpen(true)} />

        <TrendsSection trends={trendCards} />
      </>
    );
  };

  const renderPage = () => {
    if (selected === 'resumo') return renderSummary();
    if (selected === 'compartilhamento') return <SharingPage />;
    if (selected === 'perfil')
      return <ProfilePage user={user} profile={profile} saveProfile={saveProfile} />;
    return <CategoryPage categoryId={selected} />;
  };

  return (
    <div className="app">
      <Sidebar
        selected={selected}
        onSelect={handleSelect}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onLogout={onSignOut}
      />

      <main className="app__main">
        <ProfileHeader
          user={user}
          name={displayName}
          photo={profile.photo}
          onOpenProfile={() => handleSelect('perfil')}
          lastSync={summary?.lastSync}
          onOpenMobileMenu={() => setMobileOpen(true)}
        />

        {renderPage()}
      </main>

      {modalOpen && <HealthDataModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}

export default DashboardPage;
