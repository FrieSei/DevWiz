import { z } from 'zod';

export const apiKeySchema = z.object({
  key: z.string()
    .min(32, 'API key must be at least 32 characters')
    .max(512, 'API key is too long')
    .regex(/^[a-zA-Z0-9-._~+/]+=*$/, 'Invalid API key format'),
});

export const apiKeyResponseSchema = z.object({
  id: z.string(),
  lastUsed: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});