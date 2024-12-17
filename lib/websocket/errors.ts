export class WebSocketError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'WebSocketError';
  }
}

export const WS_ERROR_CODES = {
  CONNECTION_FAILED: 'WS_CONNECTION_FAILED',
  MESSAGE_PARSE_ERROR: 'WS_MESSAGE_PARSE_ERROR',
  SEND_FAILED: 'WS_SEND_FAILED',
} as const;

export function createWebSocketError(
  message: string,
  code?: keyof typeof WS_ERROR_CODES,
  originalError?: Error
): WebSocketError {
  return new WebSocketError(
    message,
    code ? WS_ERROR_CODES[code] : undefined,
    originalError
  );
}