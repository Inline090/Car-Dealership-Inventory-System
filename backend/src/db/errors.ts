interface DatabaseError {
  code?: string;
}

export const isUniqueViolation = (error: unknown): boolean =>
  typeof error === 'object' &&
  error !== null &&
  'code' in error &&
  (error as DatabaseError).code === '23505';
