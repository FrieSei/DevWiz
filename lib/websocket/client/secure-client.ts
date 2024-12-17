import { BaseWebSocketClient } from './base-client';
import { getWebSocketUrl } from '@/lib/config/api';
import { createWebSocketError } from '../errors';

export class SecureWebSocketClient extends BaseWebSocketClient {
  connect(): void {
    if (typeof window === 'undefined') return;

    try {
      const wsUrl = getWebSocketUrl(this.url);
      this.ws = new WebSocket(wsUrl);
      this.setupEventListeners();
      this.reconnectAttempts = 0;
    } catch (error) {
      this.handleError(createWebSocketError('Failed to connect'));
    }
  }

  send(data: unknown): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw createWebSocketError('Not connected');
    }

    try {
      this.ws.send(JSON.stringify(data));
    } catch (error) {
      this.handleError(createWebSocketError('Failed to send message'));
    }
  }

  cleanup(): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
    this.ws = null;
  }
}