export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketMessage {
  type: string;
  payload?: unknown;
}

export interface WebSocketConfig {
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
  pingInterval?: number;
}