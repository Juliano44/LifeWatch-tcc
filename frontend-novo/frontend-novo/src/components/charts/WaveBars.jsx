function WaveBars({ data, color = '#20D6C0', width = 90, height = 34 }) {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const barWidth = width / data.length;
  const gap = barWidth * 0.35;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label="Gráfico de níveis de exposição sonora"
    >
      {data.map((value, i) => {
        const barHeight = (value / max) * (height - 4) + 4;
        const x = i * barWidth + gap / 2;
        const y = height - barHeight;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth - gap}
            height={barHeight}
            rx={(barWidth - gap) / 2}
            fill={color}
            opacity={0.55 + (i / data.length) * 0.45}
          />
        );
      })}
    </svg>
  );
}

export default WaveBars;
