import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:3000'),
  NEXT_PUBLIC_WS_HOST: z.string().default('localhost'),
  NEXT_PUBLIC_WS_PORT: z.string().default('3001'),
});

export const env = envSchema.parse(process.env);

export const isDev = env.NODE_ENV === 'development';
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';