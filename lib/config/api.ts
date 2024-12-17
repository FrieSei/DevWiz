export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  timeout: 30000,
} as const;

export const WS_CONFIG = {
  protocol: typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'wss:' : 'ws:',
  host: process.env.NEXT_PUBLIC_WS_HOST || 'localhost',
  port: process.env.NEXT_PUBLIC_WS_PORT || '3001',
  reconnectDelay: 3000,
  maxReconnectAttempts: 5,
} as const;

export function getWebSocketUrl(path: string = ''): string {
  if (typeof window === 'undefined') return '';
  const baseUrl = `${WS_CONFIG.protocol}//${WS_CONFIG.host}:${WS_CONFIG.port}`;
  return `${baseUrl}${path}`;
}