import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.use(requireAuth);

/**
 * @openapi
 * /api/profile:
 *   get:
 *     summary: Retorna o perfil do usuário autenticado
 *     tags: [Perfil]
 *     security: [{ bearerAuth: [] }]
 *   put:
 *     summary: Atualiza o perfil do usuário autenticado
 *     tags: [Perfil]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/', getProfile);
router.put('/', updateProfile);

export default router;
