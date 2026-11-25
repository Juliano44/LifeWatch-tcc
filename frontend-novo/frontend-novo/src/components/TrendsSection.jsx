import { CategoryIcon } from './iconMap';
import Sparkline from './charts/Sparkline';
import './TrendsSection.css';

function TrendsSection({ trends }) {
  return (
    <section className="trends" aria-labelledby="trends-title">
      <h2 id="trends-title" className="trends__title">
        Tendências
      </h2>
      {trends.length === 0 && (
        <p className="trends__empty">Ainda não há histórico suficiente para mostrar tendências.</p>
      )}
      <div className="trends__grid">
        {trends.map((trend) => (
          <div className="trend-card" key={trend.id}>
            <div className="trend-card__header">
              <span className="trend-card__icon" style={{ color: trend.color }}>
                <CategoryIcon name={trend.icon} aria-hidden="true" />
              </span>
              <span className="trend-card__label">{trend.label}</span>
            </div>
            <div className="trend-card__body">
              <div>
                <p className="trend-card__value">{trend.value}</p>
                <p
                  className={`trend-card__change ${
                    trend.positive ? 'trend-card__change--up' : 'trend-card__change--down'
                  }`}
                >
                  {trend.change} nos últimos 7 dias
                </p>
              </div>
              <Sparkline data={trend.series} color={trend.color} width={80} height={30} filled />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendsSection;
