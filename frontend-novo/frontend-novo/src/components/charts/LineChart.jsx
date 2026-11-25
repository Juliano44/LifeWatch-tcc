// Gráfico de linha em SVG puro, maior que o sparkline dos cards,
// com pontos visíveis e rótulos dos dias. Usado nas telas de categoria.
const DAY_LABELS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function LineChart({ data, color = '#269DDB', height = 160 }) {
  if (!data || data.length === 0) return null;

  const width = 640;
  const padY = 24;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = width / (data.length - 1 || 1);

  const points = data.map((value, i) => {
    const x = i * stepX;
    const y = padY + (1 - (value - min) / range) * (height - padY * 2);
    return [x, y];
  });

  const linePath = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(' ');
  const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
  const gradientId = `line-chart-${color.replace('#', '')}`;

  return (
    <div className="line-chart">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
        role="img"
        aria-label="Gráfico de linha dos últimos 7 dias"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" style={{ fill: "var(--bg-card)" }} stroke={color} strokeWidth="2.5" />
        ))}
      </svg>
      <div className="line-chart__labels">
        {data.map((value, i) => (
          <span key={i}>
            <strong>{Number.isInteger(value) ? value : value.toFixed(2)}</strong>
            {DAY_LABELS[i] ?? i + 1}
          </span>
        ))}
      </div>
    </div>
  );
}

export default LineChart;
