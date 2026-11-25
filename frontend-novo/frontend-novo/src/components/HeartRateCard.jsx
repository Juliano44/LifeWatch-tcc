import { PiHeartFill } from 'react-icons/pi';
import DashboardCard from './DashboardCard';
import Sparkline from './charts/Sparkline';
import './HealthCards.css';

function HeartRateCard({ data }) {
  return (
    <DashboardCard
      icon={<PiHeartFill />}
      iconColor="#FF3B5C"
      title="Média de Batimentos em Repouso"
      time={data.time}
      className="card-heart"
    >
      <div className="heart-body">
        <span className="heart-body__value">{data.value}</span>
        <span className="heart-body__unit">{data.unit}</span>
      </div>
      <Sparkline data={data.series} color="#FF3B5C" filled />
    </DashboardCard>
  );
}

export default HeartRateCard;
