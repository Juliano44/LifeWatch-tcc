function SleepBar({ stages, width = 90, height = 24 }) {
  const total = stages.reduce((sum, s) => sum + s.value, 0) || 1;
  let cursor = 0;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Gráfico de estágios do sono"
    >
      <defs>
        <clipPath id="sleep-bar-clip">
          <rect x="0" y="0" width={width} height={height} rx={height / 2} />
        </clipPath>
      </defs>
      <g clipPath="url(#sleep-bar-clip)">
        {stages.map((stage, i) => {
          const segWidth = (stage.value / total) * width;
          const x = cursor;
          cursor += segWidth;
          return <rect key={i} x={x} y="0" width={segWidth} height={height} fill={stage.color} />;
        })}
      </g>
    </svg>
  );
}

export default SleepBar;
