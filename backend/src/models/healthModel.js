import pool from '../config/database.js';

// Todas as tabelas seguem o mesmo padrão: uma linha por usuário/dia
// (UNIQUE KEY em user_id + entry_date), então um novo registro no
// mesmo dia atualiza o existente (upsert) em vez de duplicar.

function todayIfMissing(date) {
  return date || new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------
// Atividade
// ---------------------------------------------------------------------
export async function upsertActivity(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO activity_entries
      (user_id, entry_date, movement_cal, movement_goal, exercise_min, exercise_goal, stand_hours, stand_goal)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      movement_cal = VALUES(movement_cal),
      movement_goal = VALUES(movement_goal),
      exercise_min = VALUES(exercise_min),
      exercise_goal = VALUES(exercise_goal),
      stand_hours = VALUES(stand_hours),
      stand_goal = VALUES(stand_goal),
      recorded_at = NOW()`,
    [
      userId,
      entryDate,
      data.movementCal ?? 0,
      data.movementGoal ?? 500,
      data.exerciseMin ?? 0,
      data.exerciseGoal ?? 30,
      data.standHours ?? 0,
      data.standGoal ?? 12,
    ]
  );
  return getLatestActivity(userId);
}

export async function getLatestActivity(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM activity_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

export async function getActivityHistory(userId, days = 7) {
  const [rows] = await pool.query(
    'SELECT * FROM activity_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?',
    [userId, days]
  );
  return rows;
}

// ---------------------------------------------------------------------
// Ciclo
// ---------------------------------------------------------------------
export async function upsertCycle(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO cycle_entries (user_id, entry_date, cycle_day, phase, symptoms)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      cycle_day = VALUES(cycle_day), phase = VALUES(phase), symptoms = VALUES(symptoms),
      recorded_at = NOW()`,
    [userId, entryDate, data.cycleDay ?? null, data.phase ?? null, data.symptoms ?? null]
  );
  return getLatestCycle(userId);
}

export async function getLatestCycle(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM cycle_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

// ---------------------------------------------------------------------
// Áudio
// ---------------------------------------------------------------------
export async function upsertAudio(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO audio_entries (user_id, entry_date, status, exposure_label, levels_json)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      status = VALUES(status), exposure_label = VALUES(exposure_label), levels_json = VALUES(levels_json),
      recorded_at = NOW()`,
    [
      userId,
      entryDate,
      data.status ?? 'OK',
      data.exposureLabel ?? 'Exposição de 7 Dias',
      JSON.stringify(data.levels ?? []),
    ]
  );
  return getLatestAudio(userId);
}

export async function getLatestAudio(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM audio_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

// ---------------------------------------------------------------------
// Frequência cardíaca
// ---------------------------------------------------------------------
export async function upsertHeartRate(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO heart_rate_entries (user_id, entry_date, value_bpm, series_json)
     VALUES (?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      value_bpm = VALUES(value_bpm), series_json = VALUES(series_json),
      recorded_at = NOW()`,
    [userId, entryDate, data.value, JSON.stringify(data.series ?? [])]
  );
  return getLatestHeartRate(userId);
}

export async function getLatestHeartRate(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM heart_rate_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

export async function getHeartRateHistory(userId, days = 7) {
  const [rows] = await pool.query(
    'SELECT entry_date, value_bpm FROM heart_rate_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?',
    [userId, days]
  );
  return rows;
}

// ---------------------------------------------------------------------
// Sono
// ---------------------------------------------------------------------
export async function upsertSleep(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO sleep_entries (user_id, entry_date, hours, minutes, stages_json)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      hours = VALUES(hours), minutes = VALUES(minutes), stages_json = VALUES(stages_json),
      recorded_at = NOW()`,
    [userId, entryDate, data.hours ?? 0, data.minutes ?? 0, JSON.stringify(data.stages ?? [])]
  );
  return getLatestSleep(userId);
}

export async function getLatestSleep(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM sleep_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

// ---------------------------------------------------------------------
// Estado emocional
// ---------------------------------------------------------------------
export async function upsertEmotional(userId, data) {
  const entryDate = todayIfMissing(data.entryDate);
  await pool.query(
    `INSERT INTO emotional_entries (user_id, entry_date, headline, mood_score, tags_json)
     VALUES (?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE
      headline = VALUES(headline), mood_score = VALUES(mood_score), tags_json = VALUES(tags_json),
      recorded_at = NOW()`,
    [userId, entryDate, data.headline, data.moodScore ?? 3, JSON.stringify(data.tags ?? [])]
  );
  return getLatestEmotional(userId);
}

export async function getLatestEmotional(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM emotional_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT 1',
    [userId]
  );
  return rows[0] || null;
}

export async function getSleepHistory(userId, days = 7) {
  const [rows] = await pool.query(
    'SELECT entry_date, hours, minutes FROM sleep_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?',
    [userId, days]
  );
  return rows;
}

export async function getEmotionalHistory(userId, days = 7) {
  const [rows] = await pool.query(
    'SELECT entry_date, mood_score FROM emotional_entries WHERE user_id = ? ORDER BY entry_date DESC LIMIT ?',
    [userId, days]
  );
  return rows;
}
