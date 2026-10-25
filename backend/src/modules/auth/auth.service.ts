import type { AuthResult, AuthUser } from './auth.types';
import type { LoginInput, RegisterInput } from './auth.schemas';
import type { UserRow } from './user.repository';

export const toAuthUser = (user: UserRow): AuthUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

/**
 * TODO(auth): register a new customer.
 *
 * Steps:
 *  1. Normalise the email: `const email = input.email.trim().toLowerCase();`
 *  2. Hash the password with `hashPassword(input.password)`.
 *  3. Insert with
 *     `insertUser({ name: input.name.trim(), email, passwordHash, role: 'customer' })`.
 *     Never accept a role from the request body.
 *  4. Wrap the insert in try/catch and map a unique violation (`isUniqueViolation`)
 *     to `new AppError(409, 'EMAIL_ALREADY_REGISTERED', 'An account with this email already exists')`.
 *  5. Return `{ user: toAuthUser(row), token: signAccessToken(user) }`.
 *
 * Imports to add:
 *   import { AppError } from '../../shared/errors/app-error';
 *   import { isUniqueViolation } from '../../db/errors';
 *   import { hashPassword } from './password';
 *   import { signAccessToken } from './token';
 *   import { insertUser } from './user.repository';
 */
export const registerUser = async (_input: RegisterInput): Promise<AuthResult> => {
  throw new Error('TODO(auth): implement registerUser');
};

/**
 * TODO(auth): authenticate an existing user.
 *
 * Steps:
 *  1. Normalise the email the same way as registration.
 *  2. `const user = await findUserByEmail(email);`
 *  3. If the user is missing OR `verifyPassword(...)` is false, throw the SAME error:
 *     `new AppError(401, 'INVALID_CREDENTIALS', 'Invalid email or password')`.
 *     Never reveal whether an email exists.
 *  4. Return `{ user: toAuthUser(user), token: signAccessToken(...) }`.
 *
 * Imports to add:
 *   import { verifyPassword } from './password';
 *   import { findUserByEmail } from './user.repository';
 */
export const loginUser = async (_input: LoginInput): Promise<AuthResult> => {
  throw new Error('TODO(auth): implement loginUser');
};
