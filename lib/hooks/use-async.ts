import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ErrorWithMessage } from '@/lib/types/common';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ErrorWithMessage) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useAsync<T>({
  onSuccess,
  onError,
  successMessage,
  errorMessage,
}: UseAsyncOptions<T> = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      setIsLoading(true);
      try {
        const result = await asyncFunction();
        if (successMessage) {
          toast({
            title: 'Success',
            description: successMessage,
          });
        }
        onSuccess?.(result);
        return result;
      } catch (error) {
        const message = errorMessage || (error as Error).message;
        toast({
          title: 'Error',
          description: message,
          variant: 'destructive',
        });
        onError?.(error as ErrorWithMessage);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [toast, onSuccess, onError, successMessage, errorMessage]
  );

  return { execute, isLoading };
}