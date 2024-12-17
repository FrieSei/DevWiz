'use client';

import { useState, useCallback } from 'react';
import { useWebSocket } from './use-websocket';
import { FileProcessingEvent, FileStatus } from '@/lib/websocket/types';
import { useToast } from './use-toast';

interface FileProgress {
  status: FileStatus;
  progress?: number;
  error?: string;
}

export function useFileWatcher(fileIds: string[]) {
  const [fileProgress, setFileProgress] = useState<Record<string, FileProgress>>({});
  const { toast } = useToast();

  const handleMessage = useCallback((message: FileProcessingEvent) => {
    if (message.type === 'file_status') {
      const { fileId, status, progress, error } = message.data;
      
      setFileProgress((prev) => ({
        ...prev,
        [fileId]: { status, progress, error },
      }));

      if (status === 'completed') {
        toast({
          title: 'File Processing Complete',
          description: `File ${fileId} has been processed successfully.`,
        });
      } else if (status === 'failed') {
        toast({
          title: 'File Processing Failed',
          description: error || `Failed to process file ${fileId}.`,
          variant: 'destructive',
        });
      }
    }
  }, [toast]);

  const { isConnected } = useWebSocket({
    url: `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/file-status`,
    onMessage: handleMessage,
  });

  return {
    fileProgress,
    isConnected,
  };
}