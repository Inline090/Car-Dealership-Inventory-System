import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../../src/shared/errors/app-error';
import { authorize } from '../../src/shared/middleware/authorize';

const callAuthorize = (user: Request['user']) => {
  const next = jest.fn();
  const req = { user } as unknown as Request;
  const res = {} as unknown as Response;

  authorize('admin')(req, res, next as unknown as NextFunction);

  return next;
};

describe('authorize', () => {
  it('allows a user whose role is permitted', () => {
    const next = callAuthorize({
      id: '1',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'admin',
    });

    expect(next).toHaveBeenCalledWith();
  });

  it('rejects an unauthenticated request', () => {
    const next = callAuthorize(undefined);
    const error = next.mock.calls[0]?.[0];

    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).statusCode).toBe(401);
  });

  it('forbids a user without the required role', () => {
    const next = callAuthorize({
      id: '2',
      name: 'Customer',
      email: 'customer@example.com',
      role: 'customer',
    });
    const error = next.mock.calls[0]?.[0];

    expect(error).toBeInstanceOf(AppError);
    expect((error as AppError).statusCode).toBe(403);
  });
});
