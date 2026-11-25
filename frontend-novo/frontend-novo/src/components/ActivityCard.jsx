import { PiFireFill } from 'react-icons/pi';
import DashboardCard from './DashboardCard';
import ActivityRings from './charts/ActivityRings';
import './HealthCards.css';

function ActivityCard({ data }) {
  return (
    <DashboardCard
      icon={<PiFireFill />}
      iconColor="#FF7A00"
      title="Atividade"
      time={data.time}
      className="card-activity"
    >
      <div className="stat-row">
        <div className="stat">
          <span className="stat__label stat__label--movement">Movimento</span>
          <span className="stat__value">
            {data.movementCal} <small>cal</small>
          </span>
        </div>
        <div className="stat">
          <span className="stat__label stat__label--exercise">Exercício</span>
          <span className="stat__value">
            {data.exerciseMin} <small>min</small>
          </span>
        </div>
        <div className="stat">
          <span className="stat__label stat__label--stand">Em Pé</span>
          <span className="stat__value">
            {data.standHours} <small>h</small>
          </span>
        </div>
      </div>
      <ActivityRings
        move={data.movementCal / data.movementGoal}
        exercise={data.exerciseMin / data.exerciseGoal}
        stand={data.standHours / data.standGoal}
        size={64}
      />
    </DashboardCard>
  );
}

export default ActivityCard;
