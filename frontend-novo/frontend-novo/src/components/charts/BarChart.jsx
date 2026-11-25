// Gráfico de barras em SVG puro, com rótulos dos dias da semana.
// Usado nas telas individuais de cada categoria.
const DAY_LABELS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function BarChart({ data, color = '#269DDB', height = 160 }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  // Base do eixo: um pouco abaixo do menor valor, para dar contraste
  // visual entre as barras sem exagerar a diferença.
  const base = Math.max(0, min - (max - min) * 0.6);
  const range = max - base || 1;

  return (
    <div className="bar-chart">
      <div className="bar-chart__plot" style={{ height }}>
        {data.map((value, i) => {
          const pct = ((value - base) / range) * 100;
          return (
            <div className="bar-chart__col" key={i}>
              <span className="bar-chart__value">
                {Number.isInteger(value) ? value : value.toFixed(1)}
              </span>
              <div
                className="bar-chart__bar"
                style={{
                  height: `${Math.max(pct, 4)}%`,
                  background: color,
                }}
              />
              <span className="bar-chart__label">{DAY_LABELS[i] ?? i + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BarChart;
