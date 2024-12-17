export const APP_CONFIG = {
  name: 'DevWiz',
  description: 'AI-powered technical documentation assistant for developers',
  version: '1.0.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: 30000,
  },
} as const;