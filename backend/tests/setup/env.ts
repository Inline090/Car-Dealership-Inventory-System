process.env.NODE_ENV = 'test';
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ??
  'postgresql://postgres:postgres@localhost:5432/car_dealership_test';
process.env.JWT_SECRET ??= 'test-secret-at-least-sixteen-characters';
process.env.JWT_EXPIRES_IN ??= '1h';
