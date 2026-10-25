import type { ErrorRequestHandler } from 'express';
import { env } from '../../config/env';
import { AppError } from '../errors/app-error';
import type { ApiError } from '../http/api-response';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof AppError) {
    const body: ApiError = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    };

    res.status(error.statusCode).json(body);
    return;
  }

  const message =
    env.nodeEnv === 'production'
      ? 'Internal server error'
      : error instanceof Error
        ? error.message
        : 'Internal server error';

  const body: ApiError = {
    success: false,
    error: { code: 'INTERNAL_ERROR', message },
  };

  res.status(500).json(body);
};
