import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { Client } from 'pg';
import { env } from '../config/env';

const migrationsDirectory = path.resolve(__dirname, '../../migrations');

export const runMigrations = async (databaseUrl: string): Promise<void> => {
  const client = new Client({ connectionString: databaseUrl });

  await client.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        name TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const files = (await readdir(migrationsDirectory))
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const applied = await client.query('SELECT 1 FROM schema_migrations WHERE name = $1', [file]);

      if (applied.rowCount) {
        continue;
      }

      const sql = await readFile(path.join(migrationsDirectory, file), 'utf8');

      await client.query('BEGIN');

      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }
  } finally {
    await client.end();
  }
};

if (require.main === module) {
  runMigrations(env.databaseUrl)
    .then(() => {
      console.log('Database migrations applied');
    })
    .catch((error: unknown) => {
      console.error('Database migration failed', error);
      process.exitCode = 1;
    });
}
