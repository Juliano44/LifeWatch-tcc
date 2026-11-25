import { PiSparkleFill, PiSmileyFill } from 'react-icons/pi';
import DashboardCard from './DashboardCard';
import './HealthCards.css';

function EmotionalStateCard({ data }) {
  return (
    <DashboardCard
      icon={<PiSparkleFill />}
      iconColor="#20D6C0"
      title="Estado Emocional"
      time={data.time}
      className="card-emotional"
    >
      <div className="emotional-body">
        <p className="emotional-body__headline">{data.headline}</p>
        <p className="emotional-body__tags">{data.tags.join(' • ')}</p>
      </div>
      <div className="emotional-body__illustration" aria-hidden="true">
        <PiSmileyFill />
      </div>
    </DashboardCard>
  );
}

export default EmotionalStateCard;
