import { WS_CONFIG } from '@/lib/config/constants';
import { WebSocketMessage, WebSocketConfig, WebSocketStatus } from './types';

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private pingInterval: NodeJS.Timeout | null = null;
  private status: WebSocketStatus = 'disconnected';

  constructor(
    private url: string,
    private config: WebSocketConfig = WS_CONFIG,
    private onMessage?: (data: WebSocketMessage) => void,
    private onStatusChange?: (status: WebSocketStatus) => void
  ) {
    // Ensure we're using ws:// protocol
    this.url = this.url.replace(/^wss:/, 'ws:');
  }

  connect(): void {
    if (typeof window === 'undefined') return;

    try {
      this.updateStatus('connecting');
      this.ws = new WebSocket(this.url);
      this.setupEventListeners();
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.updateStatus('connected');
      this.reconnectAttempts = 0;
      this.setupPing();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.onMessage?.(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      this.updateStatus('disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = () => {
      this.handleError(new Error('WebSocket connection error'));
    };
  }

  private updateStatus(status: WebSocketStatus): void {
    this.status = status;
    this.onStatusChange?.(status);
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.config.pingInterval);
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < (this.config.maxReconnectAttempts || 5)) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.config.reconnectDelay);
    }
  }

  private handleError(error: Error): void {
    console.error('WebSocket error:', error);
    this.updateStatus('error');
    this.cleanup();
  }

  send(data: WebSocketMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  cleanup(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}