'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useToast } from './use-toast';
import { WebSocketMessage } from '@/lib/websocket/types';
import { WebSocketConnection } from '@/lib/websocket/connection';
import { getWebSocketUrl } from '@/lib/websocket/config';
import { WS_CONFIG } from '@/lib/websocket/config';

interface UseWebSocketOptions {
  url?: string;
  onMessage?: (message: WebSocketMessage) => void;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}

export function useWebSocket({
  url,
  onMessage,
  reconnectDelay = WS_CONFIG.reconnectDelay,
  maxReconnectAttempts = WS_CONFIG.maxReconnectAttempts,
}: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const connectionRef = useRef<WebSocketConnection | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const { toast } = useToast();

  const handleConnectionChange = useCallback((connected: boolean) => {
    setIsConnected(connected);
    if (connected) {
      reconnectAttemptsRef.current = 0;
    }
  }, []);

  const handleError = useCallback((error: Error) => {
    console.error('WebSocket error:', error);
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      setTimeout(() => {
        reconnectAttemptsRef.current += 1;
        connect();
      }, reconnectDelay);
    } else {
      toast({
        title: 'Connection Error',
        description: 'Failed to maintain WebSocket connection. Please refresh the page.',
        variant: 'destructive',
      });
    }
  }, [maxReconnectAttempts, reconnectDelay, toast]);

  const connect = useCallback(() => {
    const wsUrl = getWebSocketUrl(url);
    if (!wsUrl) return;

    connectionRef.current?.cleanup();
    connectionRef.current = new WebSocketConnection(
      wsUrl,
      onMessage,
      handleConnectionChange,
      handleError
    );
    connectionRef.current.connect();
  }, [url, onMessage, handleConnectionChange, handleError]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      connect();
    }

    return () => {
      connectionRef.current?.cleanup();
    };
  }, [connect]);

  const send = useCallback((data: any) => {
    connectionRef.current?.send(data);
  }, []);

  return { isConnected, send };
}