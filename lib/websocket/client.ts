import { getWebSocketUrl } from '../config/api';
import { WebSocketMessage } from './types';

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  constructor(
    private url: string,
    private onMessage?: (data: WebSocketMessage) => void,
    private onError?: (error: Error) => void
  ) {}

  connect(): void {
    if (typeof window === 'undefined') return;

    try {
      const wsUrl = getWebSocketUrl(this.url);
      this.ws = new WebSocket(wsUrl);
      this.setupEventListeners();
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage?.(data);
      } catch (error) {
        this.handleError(error as Error);
      }
    };

    this.ws.onerror = (error) => {
      this.handleError(error as Error);
    };
  }

  private handleError(error: Error): void {
    console.error('WebSocket error:', error);
    this.onError?.(error);
    this.cleanup();
  }

  cleanup(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.ws = null;
  }
}