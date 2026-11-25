import pool from '../config/database.js';

// Gera 7 dias de dados fictícios para um usuário (demonstração do TCC).
// Pode ser executado várias vezes: usa ON DUPLICATE KEY UPDATE, então
// apenas atualiza os registros do mesmo dia em vez de duplicar.

function localDateString(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function daysAgo(n) {
  return localDateString(new Date(Date.now() - n * 24 * 60 * 60 * 1000));
}

// Índice 0 = 6 dias atrás ... índice 6 = hoje
const MOVEMENT = [300, 340, 310, 360, 390, 355, 375];
const EXERCISE = [22, 20, 21, 18, 24, 21, 19];
const STAND = [6, 5, 7, 4, 6, 5, 4];
const HEART = [59, 60, 58, 63, 61, 64, 62];
const SLEEP = [
  [6, 12],
  [6, 48],
  [7, 6],
  [6, 54],
  [7, 24],
  [7, 0],
  [7, 20],
];
const MOOD = [3, 4, 3, 4, 5, 4, 4];
const MOOD_HEADLINE = {
  3: 'Um Momento Neutro',
  4: 'Um Momento Agradável',
  5: 'Um Momento Muito Agradável',
};
const MOOD_TAGS = [
  ['Trabalho'],
  ['Família'],
  ['Trabalho'],
  ['Amizades'],
  ['Amizades', 'Animação'],
  ['Trabalho'],
  ['Animação', 'Amizades'],
];

const SLEEP_STAGES = [
  { label: 'Acordado', value: 0.3, color: '#FF9F0A' },
  { label: 'REM', value: 1.6, color: '#6A6BFF' },
  { label: 'Leve', value: 3.9, color: '#9B9CFF' },
  { label: 'Profundo', value: 1.5, color: '#3A3BCC' },
];

export async function seedDemoData(userId) {
  for (let i = 0; i < 7; i++) {
    const date = daysAgo(6 - i);

    await pool.query(
      `INSERT INTO activity_entries
        (user_id, entry_date, movement_cal, movement_goal, exercise_min, exercise_goal, stand_hours, stand_goal, recorded_at)
       VALUES (?, ?, ?, 500, ?, 30, ?, 12, ?)
       ON DUPLICATE KEY UPDATE movement_cal = VALUES(movement_cal), exercise_min = VALUES(exercise_min),
        stand_hours = VALUES(stand_hours), recorded_at = VALUES(recorded_at)`,
      [userId, date, MOVEMENT[i], EXERCISE[i], STAND[i], `${date} 09:41:00`]
    );

    const bpm = HEART[i];
    const series = [bpm - 4, bpm - 2, bpm - 3, bpm + 1, bpm - 1, bpm + 2, bpm, bpm + 3, bpm];
    await pool.query(
      `INSERT INTO heart_rate_entries (user_id, entry_date, value_bpm, series_json, recorded_at)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE value_bpm = VALUES(value_bpm), series_json = VALUES(series_json),
        recorded_at = VALUES(recorded_at)`,
      [userId, date, bpm, JSON.stringify(series), `${date} 07:00:00`]
    );

    await pool.query(
      `INSERT INTO sleep_entries (user_id, entry_date, hours, minutes, stages_json, recorded_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE hours = VALUES(hours), minutes = VALUES(minutes),
        stages_json = VALUES(stages_json), recorded_at = VALUES(recorded_at)`,
      [userId, date, SLEEP[i][0], SLEEP[i][1], JSON.stringify(SLEEP_STAGES), `${date} 06:30:00`]
    );

    await pool.query(
      `INSERT INTO emotional_entries (user_id, entry_date, headline, mood_score, tags_json, recorded_at)
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE headline = VALUES(headline), mood_score = VALUES(mood_score),
        tags_json = VALUES(tags_json), recorded_at = VALUES(recorded_at)`,
      [userId, date, MOOD_HEADLINE[MOOD[i]], MOOD[i], JSON.stringify(MOOD_TAGS[i]), `${date} 09:15:00`]
    );
  }

  const today = daysAgo(0);
  await pool.query(
    `INSERT INTO audio_entries (user_id, entry_date, status, exposure_label, levels_json, recorded_at)
     VALUES (?, ?, 'OK', 'Exposição de 7 Dias', ?, ?)
     ON DUPLICATE KEY UPDATE status = VALUES(status), levels_json = VALUES(levels_json),
      recorded_at = VALUES(recorded_at)`,
    [userId, today, JSON.stringify([38, 52, 45, 61, 40, 55, 48]), `${today} 09:16:00`]
  );

  const yesterday = daysAgo(1);
  await pool.query(
    `INSERT INTO cycle_entries (user_id, entry_date, cycle_day, phase, symptoms, recorded_at)
     VALUES (?, ?, 14, 'Fase Folicular', 'Fadiga e Dor de Cabeça', ?)
     ON DUPLICATE KEY UPDATE cycle_day = VALUES(cycle_day), phase = VALUES(phase),
      symptoms = VALUES(symptoms), recorded_at = VALUES(recorded_at)`,
    [userId, yesterday, `${yesterday} 18:30:00`]
  );
}
