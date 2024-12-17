import { z } from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'text/plain',
  'text/markdown',
  'application/pdf',
  'application/json',
  'text/yaml',
  'text/x-yaml',
  'application/x-yaml',
  'text/html',
  'text/xml',
  'application/xml',
] as const;

export const uploadRequestSchema = z.object({
  file: z.instanceof(File).refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
  ).refine(
    (file) => ALLOWED_FILE_TYPES.includes(file.type as any),
    'Invalid file type'
  ),
});

export const uploadResponseSchema = z.object({
  url: z.string().url(),
  metadata: z.object({
    name: z.string(),
    type: z.string(),
    size: z.number(),
    uploadedAt: z.string().datetime(),
  }),
});

export type UploadRequest = z.infer<typeof uploadRequestSchema>;
export type UploadResponse = z.infer<typeof uploadResponseSchema>;