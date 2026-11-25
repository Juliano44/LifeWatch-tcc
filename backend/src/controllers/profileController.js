import { findUserById, updateUserProfile } from '../models/userModel.js';

export async function getProfile(req, res, next) {
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

export async function updateProfile(req, res, next) {
  try {
    const { name, avatarInitials } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'O nome é obrigatório.' });
    }

    const user = await updateUserProfile(req.user.id, {
      name: name.trim(),
      avatarInitials: avatarInitials || name.trim()[0].toUpperCase(),
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
}
