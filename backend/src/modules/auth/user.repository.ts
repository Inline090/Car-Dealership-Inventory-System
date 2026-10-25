import { query } from '../../db/pool';
import type { UserRole } from './auth.types';

export interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}

export interface NewUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
}

export const findUserByEmail = async (email: string): Promise<UserRow | null> => {
  const result = await query<UserRow>(
    'SELECT * FROM users WHERE lower(email) = lower($1) LIMIT 1',
    [email],
  );

  return result.rows[0] ?? null;
};

export const findUserById = async (id: string): Promise<UserRow | null> => {
  const result = await query<UserRow>('SELECT * FROM users WHERE id = $1 LIMIT 1', [id]);

  return result.rows[0] ?? null;
};

export const insertUser = async (input: NewUser): Promise<UserRow> => {
  const result = await query<UserRow>(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES ($1, lower($2), $3, $4)
     RETURNING *`,
    [input.name, input.email, input.passwordHash, input.role],
  );

  const user = result.rows[0];

  if (!user) {
    throw new Error('User insert returned no row');
  }

  return user;
};
