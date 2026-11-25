import { categories } from '../data/healthData';
import { categoryDetails } from '../data/categoryDetails';
import { CategoryIcon } from './iconMap';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import './CategoryPage.css';

function CategoryPage({ categoryId }) {
  const category = categories.find((c) => c.id === categoryId);
  const details = categoryDetails[categoryId];

  if (!category) return null;

  // Categoria sem dados detalhados cadastrados: mostra um estado vazio
  // em vez de quebrar a tela.
  if (!details) {
    return (
      <section className="category-page">
        <header className="category-page__header">
          <div className="category-page__icon" style={{ background: category.color }}>
            <CategoryIcon name={category.icon} aria-hidden="true" />
          </div>
          <div>
            <h2 className="category-page__title">{category.label}</h2>
            <p className="category-page__subtitle">Nenhum dado registrado ainda.</p>
          </div>
        </header>
      </section>
    );
  }

  return (
    <section className="category-page">
      <header className="category-page__header">
        <div className="category-page__icon" style={{ background: category.color }}>
          <CategoryIcon name={category.icon} aria-hidden="true" />
        </div>
        <div>
          <h2 className="category-page__title">{category.label}</h2>
          <p className="category-page__subtitle">Atualizado hoje, 09:41</p>
        </div>
      </header>

      <div className="category-page__grid">
        {/* Destaque principal */}
        <div className="cat-card cat-card--hero">
          <p className="cat-card__label">{details.summary.label}</p>
          <p className="cat-card__hero-value" style={{ color: category.color }}>
            {details.summary.value}
            {details.summary.unit && <small> {details.summary.unit}</small>}
          </p>
        </div>

        {/* Indicadores secundários */}
        {details.highlights.map((item) => (
          <div className="cat-card" key={item.label}>
            <p className="cat-card__label">{item.label}</p>
            <p className="cat-card__value">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Gráfico da semana */}
      <div className="cat-panel">
        <h3 className="cat-panel__title">{details.chartLabel}</h3>
        {details.chart.type === 'bars' ? (
          <BarChart data={details.chart.data} color={details.chart.color} />
        ) : (
          <LineChart data={details.chart.data} color={details.chart.color} />
        )}
      </div>

      {/* Histórico */}
      <div className="cat-panel">
        <h3 className="cat-panel__title">Registros recentes</h3>
        <ul className="cat-records">
          {details.records.map((record, i) => (
            <li className="cat-records__item" key={i}>
              <span className="cat-records__date">{record.date}</span>
              <span className="cat-records__value">{record.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CategoryPage;
