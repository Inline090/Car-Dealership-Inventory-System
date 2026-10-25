import request from 'supertest';
import { app } from '../src/app';

describe('GET /api/health', () => {
  it('reports that the service is running', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: { status: 'ok' },
    });
  });
});

describe('unknown routes', () => {
  it('returns the standard error envelope', async () => {
    const response = await request(app).get('/api/does-not-exist');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      error: {
        code: 'ROUTE_NOT_FOUND',
        message: 'Route GET /api/does-not-exist not found',
      },
    });
  });
});
