import type { RequestHandler } from 'express';
import type { UserRole } from '../../modules/auth/auth.types';

/**
 * TODO(auth): restrict a route to specific roles.
 *
 * Steps:
 *  1. No `req.user` -> `next(new AppError(401, 'AUTHENTICATION_REQUIRED', 'Authentication required'))`.
 *  2. `req.user.role` not in `allowedRoles` ->
 *     `next(new AppError(403, 'FORBIDDEN', 'You do not have permission to perform this action'))`.
 *  3. Otherwise `next()`.
 *
 * Use it after `authenticate`:
 *   `router.delete('/:id', authenticate, authorize('admin'), handler)`
 *
 * Import AppError from '../errors/app-error'.
 */
export const authorize = (..._allowedRoles: UserRole[]): RequestHandler => {
  return (_req, _res, next) => {
    next(new Error('TODO(auth): implement authorize middleware'));
  };
};
