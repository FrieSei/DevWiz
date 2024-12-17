import { env, isDev } from '../config/environment';

export const WS_CONFIG = {
  reconnectDelay: 3000,
  maxReconnectAttempts: 5,
  pingInterval: 30000,
} as const;

export const getWebSocketUrl = (customUrl?: string): string => {
  if (customUrl) return customUrl;
  if (typeof window === 'undefined') return '';

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = env.NEXT_PUBLIC_WS_HOST || window.location.hostname;
  const port = env.NEXT_PUBLIC_WS_PORT || (isDev ? '3001' : '443');

  return `${protocol}//${host}:${port}/ws`;
};