import type { AuthUser, JwtClaims } from './auth.types';

export const JWT_ISSUER = 'car-dealership-api';
export const JWT_AUDIENCE = 'car-dealership-web';

/**
 * TODO(auth): sign a short-lived access token.
 *
 * Hints:
 *  - `import jwt from 'jsonwebtoken';`
 *  - `import { env } from '../../config/env';`
 *  - Throw an Error if `env.jwtSecret` is undefined.
 *  - Keep only non-sensitive claims: user id in `subject`, plus `role`.
 *  - `jwt.sign({ role: user.role }, env.jwtSecret, { subject: user.id, expiresIn: env.jwtExpiresIn, issuer: JWT_ISSUER, audience: JWT_AUDIENCE, algorithm: 'HS256' })`
 *  - Return the string token.
 */
export const signAccessToken = (_user: AuthUser): string => {
  throw new Error('TODO(auth): implement signAccessToken');
};

/**
 * TODO(auth): verify and decode an access token.
 *
 * Hints:
 *  - `jwt.verify(token, env.jwtSecret, { issuer: JWT_ISSUER, audience: JWT_AUDIENCE, algorithms: ['HS256'] })`
 *  - Pin the algorithm list so a token cannot select `none`.
 *  - Reject payloads without a string `sub` or a valid `role`.
 *  - Let jsonwebtoken errors bubble up; the middleware maps them to 401.
 *  - Return `{ sub, role, iat, exp }` typed as JwtClaims.
 */
export const verifyAccessToken = (_token: string): JwtClaims => {
  throw new Error('TODO(auth): implement verifyAccessToken');
};
