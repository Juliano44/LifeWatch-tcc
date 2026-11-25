// Gráfico de anéis concêntricos feito em SVG puro (sem biblioteca de
// gráficos) para reproduzir os pequenos indicadores circulares vistos
// no card de Atividade da imagem de referência.
function Ring({ radius, progress, color, strokeWidth }) {
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(progress, 1));
  return (
    <>
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke={color}
        strokeOpacity="0.15"
        strokeWidth={strokeWidth}
      />
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 40 40)"
      />
    </>
  );
}

function ActivityRings({ move, exercise, stand, size = 80 }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      role="img"
      aria-label="Anéis de atividade: movimento, exercício e em pé"
    >
      <Ring radius={34} progress={move} color="#FF3B30" strokeWidth={7} />
      <Ring radius={25} progress={exercise} color="#7AE23B" strokeWidth={7} />
      <Ring radius={16} progress={stand} color="#20D6C0" strokeWidth={7} />
    </svg>
  );
}

export default ActivityRings;
