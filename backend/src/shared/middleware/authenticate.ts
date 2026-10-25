import type { RequestHandler } from 'express';

/**
 * TODO(auth): authenticate requests using a Bearer access token.
 *
 * Steps:
 *  1. Read `req.headers.authorization`. Accept only `Bearer <token>` (scheme case-insensitive).
 *     Missing or malformed -> `next(new AppError(401, 'AUTHENTICATION_REQUIRED', 'Authentication required'))`.
 *  2. Call `verifyAccessToken(token)` inside try/catch.
 *     Any jsonwebtoken error -> `next(new AppError(401, 'INVALID_TOKEN', 'Invalid or expired token'))`.
 *  3. Load the user with `findUserById(claims.sub)`.
 *     Missing user -> the same INVALID_TOKEN error (deleted account or stale token).
 *  4. `req.user = { id, name, email, role }; return next();`
 *
 * Imports to add:
 *   import { AppError } from '../errors/app-error';
 *   import { findUserById } from '../../modules/auth/user.repository';
 *   import { verifyAccessToken } from '../../modules/auth/token';
 */
export const authenticate: RequestHandler = (_req, _res, next) => {
  next(new Error('TODO(auth): implement authenticate middleware'));
};
