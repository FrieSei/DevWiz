'use client';

import { useEffect } from 'react';
import { useFileWatcher } from '@/hooks/use-file-watcher';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface FileStatusProps {
  fileIds: string[];
  onComplete?: (fileId: string) => void;
  onError?: (fileId: string, error: string) => void;
}

export function FileStatus({ fileIds, onComplete, onError }: FileStatusProps) {
  const { fileProgress, isConnected } = useFileWatcher(fileIds);

  useEffect(() => {
    Object.entries(fileProgress).forEach(([fileId, progress]) => {
      if (progress.status === 'completed') {
        onComplete?.(fileId);
      } else if (progress.status === 'failed' && progress.error) {
        onError?.(fileId, progress.error);
      }
    });
  }, [fileProgress, onComplete, onError]);

  if (!isConnected) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Connection Lost</AlertTitle>
        <AlertDescription>
          Lost connection to the file processing service. Please refresh the page.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {fileIds.map((fileId) => {
        const progress = fileProgress[fileId];
        
        if (!progress) {
          return null;
        }

        return (
          <div key={fileId} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">File ID: {fileId}</span>
              </div>
              {progress.status === 'processing' && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}
              {progress.status === 'completed' && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {progress.status === 'failed' && (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            
            {progress.status === 'processing' && progress.progress !== undefined && (
              <Progress value={progress.progress} className="h-2" />
            )}
            
            {progress.error && (
              <p className="text-sm text-destructive mt-2">{progress.error}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}