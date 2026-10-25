import request from 'supertest';
import { app } from '../../src/app';
import { query } from '../../src/db/pool';
import { clearDatabase, setupDatabase, teardownDatabase } from '../helpers/database';

const account = {
  name: 'Alan Turing',
  email: 'alan@example.com',
  password: 'password123',
};

const register = async (): Promise<string> => {
  const response = await request(app).post('/api/auth/register').send(account);

  return response.body.data.token as string;
};

describe('GET /api/auth/me', () => {
  beforeAll(setupDatabase);
  beforeEach(clearDatabase);
  afterAll(teardownDatabase);

  it('rejects a request without a token', async () => {
    const response = await request(app).get('/api/auth/me');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });

  it('rejects a malformed authorization header', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Token abc');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });

  it('rejects an invalid token', async () => {
    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', 'Bearer not-a-jwt');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_TOKEN');
  });

  it('returns the authenticated user for a valid token', async () => {
    const token = await register();

    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.user).toMatchObject({
      name: 'Alan Turing',
      email: 'alan@example.com',
      role: 'customer',
    });
  });

  it('rejects a token whose user no longer exists', async () => {
    const token = await register();

    await query('DELETE FROM users WHERE lower(email) = $1', ['alan@example.com']);

    const response = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_TOKEN');
  });
});

describe('vehicle endpoints', () => {
  beforeAll(setupDatabase);
  afterAll(teardownDatabase);

  it('require authentication', async () => {
    const response = await request(app).get('/api/vehicles');

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });
});
