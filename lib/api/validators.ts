import { z } from 'zod';

export const chatMessageSchema = z.object({
  content: z.string().min(1).max(4000),
});

export const fileMetadataSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type FileMetadata = z.infer<typeof fileMetadataSchema>;