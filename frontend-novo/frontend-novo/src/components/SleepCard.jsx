import { PiBedFill } from 'react-icons/pi';
import DashboardCard from './DashboardCard';
import SleepBar from './charts/SleepBar';
import './HealthCards.css';

function SleepCard({ data }) {
  return (
    <DashboardCard
      icon={<PiBedFill />}
      iconColor="#8861E8"
      title="Sono"
      time={data.time}
      className="card-sleep"
    >
      <div className="sleep-body">
        <p className="sleep-body__label">Tempo Dormindo</p>
        <p className="sleep-body__value">
          {data.hours}
          <small> h </small>
          {data.minutes}
          <small> min</small>
        </p>
      </div>
      <SleepBar stages={data.stages} />
    </DashboardCard>
  );
}

export default SleepCard;
