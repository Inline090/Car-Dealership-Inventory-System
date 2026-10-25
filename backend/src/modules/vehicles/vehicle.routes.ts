import { Router } from 'express';
import { authenticate } from '../../shared/middleware/authenticate';

export const vehicleRouter = Router();

/**
 * The vehicle API is protected as a whole. Individual admin-only routes
 * (DELETE /:id and POST /:id/restock) will add `authorize('admin')` when
 * they are implemented.
 */
vehicleRouter.use(authenticate);
