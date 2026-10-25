export const BCRYPT_SALT_ROUNDS = 12;

/**
 * TODO(auth): hash a password with bcrypt.
 *
 * Hints:
 *  - `import bcrypt from 'bcrypt';`
 *  - `return bcrypt.hash(plainPassword, BCRYPT_SALT_ROUNDS);`
 *  - Never log, return, or persist the plain password.
 */
export const hashPassword = async (_plainPassword: string): Promise<string> => {
  throw new Error('TODO(auth): implement hashPassword');
};

/**
 * TODO(auth): compare a plain password with the stored hash.
 *
 * Hints:
 *  - `return bcrypt.compare(plainPassword, passwordHash);`
 *  - Use bcrypt.compare; never compare hashes or passwords with `===`.
 */
export const verifyPassword = async (
  _plainPassword: string,
  _passwordHash: string,
): Promise<boolean> => {
  throw new Error('TODO(auth): implement verifyPassword');
};
