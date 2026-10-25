import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z
    .string()
    .min(1)
    .default('postgresql://postgres:postgres@localhost:5432/car_dealership'),
  CORS_ORIGIN: z.url().default('http://localhost:5173'),
  JWT_SECRET: z.string().min(16).optional(),
  JWT_EXPIRES_IN: z.string().min(1).default('1h'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const issues = result.error.issues
    .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  throw new Error(`Invalid environment configuration:\n${issues}`);
}

const parsed = result.data;

if (parsed.NODE_ENV === 'production' && !parsed.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

export const env = {
  nodeEnv: parsed.NODE_ENV,
  port: parsed.PORT,
  databaseUrl: parsed.DATABASE_URL,
  corsOrigin: parsed.CORS_ORIGIN,
  jwtSecret: parsed.JWT_SECRET,
  jwtExpiresIn: parsed.JWT_EXPIRES_IN,
} as const;
