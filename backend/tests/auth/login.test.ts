import request from 'supertest';
import { app } from '../../src/app';
import { clearDatabase, setupDatabase, teardownDatabase } from '../helpers/database';

const account = {
  name: 'Grace Hopper',
  email: 'grace@example.com',
  password: 'password123',
};

describe('POST /api/auth/login', () => {
  beforeAll(setupDatabase);

  beforeEach(async () => {
    await clearDatabase();
    await request(app).post('/api/auth/register').send(account);
  });

  afterAll(teardownDatabase);

  it('returns an access token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'GRACE@example.com', password: account.password });

    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe('grace@example.com');
    expect(typeof response.body.data.token).toBe('string');
  });

  it('rejects a wrong password without revealing which field failed', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: account.email, password: 'wrong-password' });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    expect(response.body.error.message).toBe('Invalid email or password');
  });

  it('rejects an unknown email with the same response', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body.error.code).toBe('INVALID_CREDENTIALS');
    expect(response.body.error.message).toBe('Invalid email or password');
  });

  it('validates the login payload', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: '' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
