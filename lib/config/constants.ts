export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const WS_CONFIG = {
  host: process.env.NEXT_PUBLIC_WS_HOST || 'localhost',
  port: process.env.NEXT_PUBLIC_WS_PORT || '3001',
  reconnectDelay: 3000,
  maxReconnectAttempts: 5,
  pingInterval: 30000,
} as const;