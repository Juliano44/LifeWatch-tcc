import { validationResult } from 'express-validator';
import { findUserByEmail, findUserById, createUser } from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { seedDemoData } from '../utils/demoData.js';

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Dados inválidos.', errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
    }

    const passwordHash = await hashPassword(password);
    const user = await createUser({
      name,
      email,
      passwordHash,
      avatarInitials: getInitials(name),
    });

    // Para a demonstração do TCC, novas contas já nascem com 7 dias de dados
    // fictícios. Desative com SEED_DEMO_DATA_ON_REGISTER=false no .env.
    if (process.env.SEED_DEMO_DATA_ON_REGISTER !== 'false') {
      try {
        await seedDemoData(user.id);
      } catch (seedError) {
        console.error('Não foi possível gerar os dados de demonstração:', seedError.message);
      }
    }

    const token = generateToken({ id: user.id, email: user.email });

    res.status(201).json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Dados inválidos.', errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    const passwordMatches = await comparePassword(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'E-mail ou senha incorretos.' });
    }

    const token = generateToken({ id: user.id, email: user.email });

    delete user.password_hash;
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
}
