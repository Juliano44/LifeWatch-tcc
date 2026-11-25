import DashboardCard from './DashboardCard';
import './HealthCards.css';

// Card exibido quando o usuário ainda não tem registro daquela categoria.
function EmptyCard({ icon, iconColor, title }) {
  return (
    <DashboardCard icon={icon} iconColor={iconColor} title={title}>
      <p className="empty-card__text">Sem dados registrados ainda.</p>
    </DashboardCard>
  );
}

export default EmptyCard;
