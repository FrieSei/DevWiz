import { WS_CONFIG } from '@/lib/config/api';
import { WebSocketMessage } from '../types';
import { createWebSocketError } from '../errors';

export abstract class BaseWebSocketClient {
  protected ws: WebSocket | null = null;
  protected reconnectAttempts = 0;

  constructor(
    protected url: string,
    protected onMessage?: (data: WebSocketMessage) => void,
    protected onError?: (error: Error) => void
  ) {}

  abstract connect(): void;
  abstract send(data: unknown): void;
  abstract cleanup(): void;

  protected handleError(error: Error): void {
    console.error('WebSocket error:', error);
    this.onError?.(error);
    
    if (this.reconnectAttempts < WS_CONFIG.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), WS_CONFIG.reconnectDelay);
    } else {
      this.cleanup();
    }
  }

  protected setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage?.(data);
      } catch (error) {
        this.handleError(createWebSocketError('Failed to parse message'));
      }
    };

    this.ws.onerror = () => {
      this.handleError(createWebSocketError('Connection error'));
    };

    this.ws.onclose = () => {
      this.handleError(createWebSocketError('Connection closed'));
    };
  }
}