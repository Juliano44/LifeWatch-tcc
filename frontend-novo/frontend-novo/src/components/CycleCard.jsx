import { PiFlowerLotusFill } from 'react-icons/pi';
import DashboardCard from './DashboardCard';
import './HealthCards.css';

function CycleCard({ data, onOpen }) {
  return (
    <DashboardCard
      icon={<PiFlowerLotusFill />}
      iconColor="#FF5F9E"
      title="Acompanhamento de Ciclo"
      time={data.updated}
      onClick={onOpen}
      className="card-cycle"
    >
      <div className="cycle-body">
        <p className="cycle-body__status">{data.status}</p>
        <p className="cycle-body__phase">
          Dia {data.day} · {data.phase}
        </p>
      </div>
      <div className="cycle-dots" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className={i < 3 ? 'cycle-dot cycle-dot--active' : 'cycle-dot'} />
        ))}
      </div>
    </DashboardCard>
  );
}

export default CycleCard;
