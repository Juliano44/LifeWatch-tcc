// Monta os cards da seção "Tendências" a partir do histórico que vem
// do backend (/health/trends). Tudo é calculado aqui, no front.

const average = (list) => (list.length ? list.reduce((a, b) => a + b, 0) / list.length : 0);

// Variação percentual do último valor contra a média dos anteriores.
function percentChange(series) {
  if (series.length < 2) return 0;
  const previous = average(series.slice(0, -1));
  if (previous === 0) return 0;
  return ((series.at(-1) - previous) / previous) * 100;
}

function formatPercent(value) {
  const rounded = Math.round(value);
  if (rounded === 0) return '=';
  return `${rounded > 0 ? '+' : ''}${rounded}%`;
}

function formatMinutesDiff(minutes) {
  const rounded = Math.round(minutes);
  if (rounded === 0) return '=';
  return `${rounded > 0 ? '+' : ''}${rounded}min`;
}

const MOOD_LABELS = { 1: 'Muito baixo', 2: 'Baixo', 3: 'Neutro', 4: 'Positivo', 5: 'Muito positivo' };

export function buildTrends(trends) {
  if (!trends) return [];
  const cards = [];

  const heart = trends.heartRate.map((d) => d.value);
  if (heart.length) {
    const change = percentChange(heart);
    cards.push({
      id: 'heart',
      label: 'Frequência Cardíaca',
      value: `${heart.at(-1)} BPM`,
      change: formatPercent(change),
      positive: change <= 0, // batimento em repouso menor é melhor
      color: '#FF3B5C',
      icon: 'PiHeartFill',
      series: heart,
    });
  }

  const sleepMinutes = trends.sleep.map((d) => d.hours * 60 + d.minutes);
  if (sleepMinutes.length) {
    const last = sleepMinutes.at(-1);
    const diff = sleepMinutes.length > 1 ? last - average(sleepMinutes.slice(0, -1)) : 0;
    cards.push({
      id: 'sleep',
      label: 'Sono',
      value: `${Math.floor(last / 60)}h ${String(last % 60).padStart(2, '0')}min`,
      change: formatMinutesDiff(diff),
      positive: diff >= 0,
      color: '#8861E8',
      icon: 'PiBedFill',
      series: sleepMinutes.map((m) => m / 60),
    });
  }

  const movement = trends.activity.map((d) => d.movementCal);
  if (movement.length) {
    const change = percentChange(movement);
    cards.push({
      id: 'activity',
      label: 'Atividade',
      value: `${movement.at(-1)} cal`,
      change: formatPercent(change),
      positive: change >= 0,
      color: '#FF7A00',
      icon: 'PiFireFill',
      series: movement,
    });

    const exercise = trends.activity.map((d) => d.exerciseMin);
    const exerciseChange = percentChange(exercise);
    cards.push({
      id: 'exercise',
      label: 'Exercícios',
      value: `${exercise.at(-1)} min/dia`,
      change: formatPercent(exerciseChange),
      positive: exerciseChange >= 0,
      color: '#32C673',
      icon: 'PiPersonSimpleWalkFill',
      series: exercise,
    });
  }

  const mood = trends.emotional.map((d) => d.moodScore);
  if (mood.length) {
    const change = percentChange(mood);
    cards.push({
      id: 'mood',
      label: 'Bem-estar',
      value: MOOD_LABELS[mood.at(-1)] ?? 'Estável',
      change: formatPercent(change),
      positive: change >= 0,
      color: '#20D6C0',
      icon: 'PiSparkleFill',
      series: mood,
    });
  }

  return cards;
}
