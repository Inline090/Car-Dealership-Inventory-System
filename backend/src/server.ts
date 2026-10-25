import { app } from './app';
import { env } from './config/env';
import { closePool } from './db/pool';

const server = app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.log(`${signal} received, shutting down`);

  server.close(async () => {
    await closePool();
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
