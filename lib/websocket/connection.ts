'use client';

import { WebSocketMessage } from './types';
import { WS_CONFIG } from './config';
import { createWebSocketError, WS_ERROR_CODES } from './errors';

export class WebSocketConnection {
  private ws: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;

  constructor(
    private url: string,
    private onMessage?: (message: WebSocketMessage) => void,
    private onConnectionChange?: (connected: boolean) => void,
    private onError?: (error: Error) => void
  ) {}

  connect(): void {
    if (typeof window === 'undefined') return;

    try {
      // Validate URL before creating WebSocket
      if (!this.url.startsWith('ws://') && !this.url.startsWith('wss://')) {
        throw createWebSocketError(
          'Invalid WebSocket URL protocol',
          'CONNECTION_FAILED'
        );
      }

      this.ws = new WebSocket(this.url);
      this.setupEventListeners();
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  private setupEventListeners(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.onConnectionChange?.(true);
      this.setupPing();
    };

    this.ws.onclose = () => {
      this.onConnectionChange?.(false);
      this.cleanup();
    };

    this.ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        if (message.type !== 'pong') {
          this.onMessage?.(message);
        }
      } catch (error) {
        this.handleError(
          createWebSocketError(
            'Failed to parse WebSocket message',
            'MESSAGE_PARSE_ERROR',
            error as Error
          )
        );
      }
    };

    this.ws.onerror = (event) => {
      this.handleError(
        createWebSocketError(
          'WebSocket error occurred',
          'CONNECTION_FAILED'
        )
      );
    };
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, WS_CONFIG.pingInterval);
  }

  send(data: any): void {
    try {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data));
      }
    } catch (error) {
      this.handleError(
        createWebSocketError(
          'Failed to send message',
          'SEND_FAILED',
          error as Error
        )
      );
    }
  }

  private handleError(error: Error): void {
    console.error('WebSocket error:', error);
    this.onError?.(error);
    this.cleanup();
  }

  cleanup(): void {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    if (this.ws) {
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close();
      }
      this.ws = null;
    }
  }
}