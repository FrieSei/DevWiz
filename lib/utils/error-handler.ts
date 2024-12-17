import { ApiError } from '../api/errors';
import { ErrorWithMessage } from '../types/common';

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
}

export function createApiError(error: unknown): ErrorWithMessage {
  if (isApiError(error)) {
    return {
      message: error.message,
      code: error.code,
      status: error.statusCode,
    };
  }

  return {
    message: getErrorMessage(error),
    status: 500,
  };
}