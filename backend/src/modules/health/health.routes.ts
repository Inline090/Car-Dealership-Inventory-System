import { Router } from 'express';
import type { ApiSuccess } from '../../shared/http/api-response';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const body: ApiSuccess<{ status: 'ok' }> = {
    success: true,
    data: { status: 'ok' },
  };

  res.status(200).json(body);
});
