import * as healthModel from '../models/healthModel.js';
import {
  formatActivity,
  formatCycle,
  formatAudio,
  formatHeartRate,
  formatSleep,
  formatEmotional,
  formatLastSync,
} from '../utils/formatters.js';

// Cada categoria tem o mesmo comportamento (GET devolve o registro mais
// recente, POST grava/atualiza o registro do dia), então os handlers são
// gerados por esta função em vez de repetidos seis vezes.
function createHandlers({ key, getLatest, upsert, format, required = [] }) {
  return {
    get: async (req, res, next) => {
      try {
        const row = await getLatest(req.user.id);
        res.json({ [key]: format(row) });
      } catch (error) {
        next(error);
      }
    },
    save: async (req, res, next) => {
      try {
        const missing = required.filter((field) => req.body?.[field] == null || req.body[field] === '');
        if (missing.length > 0) {
          return res.status(400).json({ message: `Campos obrigatórios: ${missing.join(', ')}.` });
        }
        const row = await upsert(req.user.id, req.body ?? {});
        res.status(201).json({ [key]: format(row) });
      } catch (error) {
        next(error);
      }
    },
  };
}

const activity = createHandlers({
  key: 'activity',
  getLatest: healthModel.getLatestActivity,
  upsert: healthModel.upsertActivity,
  format: formatActivity,
});
const cycle = createHandlers({
  key: 'cycle',
  getLatest: healthModel.getLatestCycle,
  upsert: healthModel.upsertCycle,
  format: formatCycle,
});
const audio = createHandlers({
  key: 'audio',
  getLatest: healthModel.getLatestAudio,
  upsert: healthModel.upsertAudio,
  format: formatAudio,
});
const heartRate = createHandlers({
  key: 'heartRate',
  getLatest: healthModel.getLatestHeartRate,
  upsert: healthModel.upsertHeartRate,
  format: formatHeartRate,
  required: ['value'],
});
const sleep = createHandlers({
  key: 'sleep',
  getLatest: healthModel.getLatestSleep,
  upsert: healthModel.upsertSleep,
  format: formatSleep,
});
const emotional = createHandlers({
  key: 'emotional',
  getLatest: healthModel.getLatestEmotional,
  upsert: healthModel.upsertEmotional,
  format: formatEmotional,
  required: ['headline'],
});

export const getActivity = activity.get;
export const saveActivity = activity.save;
export const getCycle = cycle.get;
export const saveCycle = cycle.save;
export const getAudio = audio.get;
export const saveAudio = audio.save;
export const getHeartRate = heartRate.get;
export const saveHeartRate = heartRate.save;
export const getSleep = sleep.get;
export const saveSleep = sleep.save;
export const getEmotional = emotional.get;
export const saveEmotional = emotional.save;

// ---------------------------------------------------------------------
// Resumo — tudo que a tela "Resumo" precisa, já no formato do frontend
// ---------------------------------------------------------------------
export async function getSummary(req, res, next) {
  try {
    const userId = req.user.id;

    const [a, c, au, h, s, e] = await Promise.all([
      healthModel.getLatestActivity(userId),
      healthModel.getLatestCycle(userId),
      healthModel.getLatestAudio(userId),
      healthModel.getLatestHeartRate(userId),
      healthModel.getLatestSleep(userId),
      healthModel.getLatestEmotional(userId),
    ]);

    res.json({
      activity: formatActivity(a),
      cycle: formatCycle(c),
      audio: formatAudio(au),
      heartRate: formatHeartRate(h),
      sleep: formatSleep(s),
      emotional: formatEmotional(e),
      lastSync: formatLastSync([a, c, au, h, s, e]),
    });
  } catch (error) {
    next(error);
  }
}

// ---------------------------------------------------------------------
// Tendências — histórico dos últimos N dias, do mais antigo ao mais novo
// ---------------------------------------------------------------------
export async function getTrends(req, res, next) {
  try {
    const userId = req.user.id;
    const requested = Number(req.query.days);
    const days = Number.isInteger(requested) && requested > 0 && requested <= 90 ? requested : 7;

    const [activityRows, heartRows, sleepRows, emotionalRows] = await Promise.all([
      healthModel.getActivityHistory(userId, days),
      healthModel.getHeartRateHistory(userId, days),
      healthModel.getSleepHistory(userId, days),
      healthModel.getEmotionalHistory(userId, days),
    ]);

    res.json({
      days,
      activity: activityRows.reverse().map((r) => ({
        date: r.entry_date,
        movementCal: Number(r.movement_cal),
        exerciseMin: r.exercise_min,
        standHours: Number(r.stand_hours),
      })),
      heartRate: heartRows.reverse().map((r) => ({ date: r.entry_date, value: r.value_bpm })),
      sleep: sleepRows.reverse().map((r) => ({
        date: r.entry_date,
        hours: r.hours,
        minutes: r.minutes,
      })),
      emotional: emotionalRows.reverse().map((r) => ({
        date: r.entry_date,
        moodScore: r.mood_score,
      })),
    });
  } catch (error) {
    next(error);
  }
}
