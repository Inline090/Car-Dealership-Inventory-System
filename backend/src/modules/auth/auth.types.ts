export type UserRole = 'customer' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface JwtClaims {
  sub: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
}
