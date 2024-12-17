'use client';

import { useState } from 'react';
import { FileStatus } from './file-status';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UploadStatusProps {
  onAllComplete?: () => void;
}

export function UploadStatus({ onAllComplete }: UploadStatusProps) {
  const [completedFiles, setCompletedFiles] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const handleComplete = (fileId: string) => {
    setCompletedFiles((prev) => {
      const next = new Set(prev);
      next.add(fileId);
      return next;
    });
  };

  const handleError = (fileId: string, error: string) => {
    toast({
      title: 'Processing Error',
      description: `Failed to process file: ${error}`,
      variant: 'destructive',
    });
  };

  return (
    <Card className="p-4">
      <FileStatus
        fileIds={['file1', 'file2']} // Replace with actual file IDs
        onComplete={handleComplete}
        onError={handleError}
      />
    </Card>
  );
}