import pool from '../config/database.js';

export async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

export async function findUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, name, email, avatar_initials, created_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

export async function createUser({ name, email, passwordHash, avatarInitials }) {
  const [result] = await pool.query(
    'INSERT INTO users (name, email, password_hash, avatar_initials) VALUES (?, ?, ?, ?)',
    [name, email, passwordHash, avatarInitials]
  );
  return findUserById(result.insertId);
}

export async function updateUserProfile(id, { name, avatarInitials }) {
  await pool.query('UPDATE users SET name = ?, avatar_initials = ? WHERE id = ?', [
    name,
    avatarInitials,
    id,
  ]);
  return findUserById(id);
}
