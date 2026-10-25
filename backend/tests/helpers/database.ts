import { env } from '../../src/config/env';
import { runMigrations } from '../../src/db/migrate';
import { closePool, query } from '../../src/db/pool';

export const setupDatabase = async (): Promise<void> => {
  await runMigrations(env.databaseUrl);
};

export const clearDatabase = async (): Promise<void> => {
  await query('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
};

export const teardownDatabase = async (): Promise<void> => {
  await closePool();
};
