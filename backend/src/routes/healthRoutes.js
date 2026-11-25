import { Router } from 'express';
import * as healthController from '../controllers/healthController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/health/summary:
 *   get:
 *     summary: Retorna o resumo consolidado (todos os cards do dashboard)
 *     tags: [Saúde]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/summary', healthController.getSummary);

/**
 * @openapi
 * /api/health/trends:
 *   get:
 *     summary: Retorna o histórico dos últimos N dias para a seção Tendências
 *     tags: [Saúde]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/trends', healthController.getTrends);

router.get('/activity', healthController.getActivity);
router.post('/activity', healthController.saveActivity);

router.get('/cycle', healthController.getCycle);
router.post('/cycle', healthController.saveCycle);

router.get('/audio', healthController.getAudio);
router.post('/audio', healthController.saveAudio);

router.get('/heart-rate', healthController.getHeartRate);
router.post('/heart-rate', healthController.saveHeartRate);

router.get('/sleep', healthController.getSleep);
router.post('/sleep', healthController.saveSleep);

router.get('/emotional', healthController.getEmotional);
router.post('/emotional', healthController.saveEmotional);

export default router;
