// Converte as linhas do banco (snake_case, JSON como texto) para o formato
// que o frontend usa (camelCase, arrays já convertidos).
//
// Observação: no MariaDB o tipo JSON é apenas um alias de LONGTEXT, então o
// driver devolve o conteúdo como string — por isso o parseJson abaixo.

function parseJson(value, fallback = []) {
  if (value == null) return fallback;
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// "2026-10-21 09:41:00" -> "09:41"
function timeOf(dateTime) {
  return dateTime ? String(dateTime).slice(11, 16) : '';
}

function localDateString(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

// "2026-10-20" -> "Ontem" | "Hoje" | "20/10"
function relativeDay(dateStr) {
  if (!dateStr) return '';
  const today = localDateString();
  const yesterday = localDateString(new Date(Date.now() - 24 * 60 * 60 * 1000));
  if (dateStr === today) return 'Hoje';
  if (dateStr === yesterday) return 'Ontem';
  const [, month, day] = String(dateStr).split('-');
  return `${day}/${month}`;
}

export function formatActivity(row) {
  if (!row) return null;
  return {
    time: timeOf(row.recorded_at),
    movementCal: Number(row.movement_cal),
    movementGoal: Number(row.movement_goal),
    exerciseMin: row.exercise_min,
    exerciseGoal: row.exercise_goal,
    standHours: Number(row.stand_hours),
    standGoal: Number(row.stand_goal),
  };
}

export function formatCycle(row) {
  if (!row) return null;
  return {
    status: row.symptoms || 'Sem sintomas',
    updated: relativeDay(row.entry_date),
    day: row.cycle_day,
    phase: row.phase || '',
  };
}

export function formatAudio(row) {
  if (!row) return null;
  return {
    status: row.status,
    time: timeOf(row.recorded_at),
    exposureLabel: row.exposure_label,
    levels: parseJson(row.levels_json),
  };
}

export function formatHeartRate(row) {
  if (!row) return null;
  return {
    value: row.value_bpm,
    unit: 'BPM',
    time: timeOf(row.recorded_at),
    series: parseJson(row.series_json),
  };
}

export function formatSleep(row) {
  if (!row) return null;
  return {
    hours: row.hours,
    minutes: row.minutes,
    time: timeOf(row.recorded_at),
    stages: parseJson(row.stages_json),
  };
}

export function formatEmotional(row) {
  if (!row) return null;
  return {
    time: timeOf(row.recorded_at),
    headline: row.headline,
    moodScore: row.mood_score,
    tags: parseJson(row.tags_json),
  };
}

// "Hoje, 09:41" a partir do registro mais recente entre todas as categorias.
export function formatLastSync(rows) {
  const stamps = rows.filter(Boolean).map((r) => String(r.recorded_at));
  if (stamps.length === 0) return null;
  const latest = stamps.sort().at(-1);
  const day = relativeDay(latest.slice(0, 10));
  return `${day}, ${timeOf(latest)}`;
}
