import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Auth]
 */
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('O nome é obrigatório.'),
    body('email').isEmail().withMessage('E-mail inválido.'),
    body('password').isLength({ min: 6 }).withMessage('A senha deve ter ao menos 6 caracteres.'),
  ],
  register
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Auth]
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('E-mail inválido.'),
    body('password').notEmpty().withMessage('A senha é obrigatória.'),
  ],
  login
);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Auth]
 *     security: [{ bearerAuth: [] }]
 */
router.get('/me', requireAuth, me);

export default router;
