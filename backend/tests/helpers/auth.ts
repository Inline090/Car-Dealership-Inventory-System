import request from 'supertest';
import { app } from '../../src/app';

export const defaultRegistration = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  password: 'password123',
};

export const registerAccount = (overrides: Partial<typeof defaultRegistration> = {}) =>
  request(app)
    .post('/api/auth/register')
    .send({ ...defaultRegistration, ...overrides });

export const loginAccount = (email: string, password: string) =>
  request(app).post('/api/auth/login').send({ email, password });
