import { query } from '../../src/db/pool';
import { app } from '../../src/app';
import request from 'supertest';
import { clearDatabase, setupDatabase, teardownDatabase } from '../helpers/database';

describe('POST /api/auth/register', () => {
  beforeAll(setupDatabase);
  beforeEach(clearDatabase);
  afterAll(teardownDatabase);

  it('creates a customer account and returns an access token', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Ada Lovelace',
      email: 'Ada@Example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toMatchObject({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      role: 'customer',
    });
    expect(response.body.data.user).not.toHaveProperty('password');
    expect(response.body.data.user).not.toHaveProperty('password_hash');
    expect(typeof response.body.data.token).toBe('string');
  });

  it('stores a bcrypt hash instead of the plain password', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'password123',
    });

    const result = await query<{ password_hash: string }>(
      'SELECT password_hash FROM users WHERE lower(email) = $1',
      ['ada@example.com'],
    );

    expect(result.rows[0]?.password_hash).toBeDefined();
    expect(result.rows[0]?.password_hash).not.toBe('password123');
    expect(result.rows[0]?.password_hash.startsWith('$2')).toBe(true);
  });

  it('ignores a role supplied in the request body', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'Mallory',
      email: 'mallory@example.com',
      password: 'password123',
      role: 'admin',
    });

    expect(response.status).toBe(201);
    expect(response.body.data.user.role).toBe('customer');
  });

  it('rejects a duplicate email regardless of casing', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'password123',
    });

    const response = await request(app).post('/api/auth/register').send({
      name: 'Ada Again',
      email: 'ADA@EXAMPLE.COM',
      password: 'password123',
    });

    expect(response.status).toBe(409);
    expect(response.body.error.code).toBe('EMAIL_ALREADY_REGISTERED');
  });

  it('returns validation details for an invalid payload', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'A',
      email: 'not-an-email',
      password: 'short',
    });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'name' }),
        expect.objectContaining({ path: 'email' }),
        expect.objectContaining({ path: 'password' }),
      ]),
    );
  });
});
