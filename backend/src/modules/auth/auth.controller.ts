import type { Request, Response } from 'express';
import { AppError } from '../../shared/errors/app-error';
import type { ApiSuccess } from '../../shared/http/api-response';
import type { LoginInput, RegisterInput } from './auth.schemas';
import { loginUser, registerUser } from './auth.service';
import type { AuthResult, AuthUser } from './auth.types';

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body as RegisterInput);

  const body: ApiSuccess<AuthResult> = { success: true, data: result };

  res.status(201).json(body);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body as LoginInput);

  const body: ApiSuccess<AuthResult> = { success: true, data: result };

  res.status(200).json(body);
};

export const me = (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    throw new AppError(401, 'AUTHENTICATION_REQUIRED', 'Authentication required');
  }

  const body: ApiSuccess<{ user: AuthUser }> = { success: true, data: { user } };

  res.status(200).json(body);
};
