import { useCallback, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from './button';
import { Progress } from './progress';
import { formatFileSize } from '@/lib/utils/file';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  accept?: string;
  maxSize?: number;
}

export function FileUpload({ onUpload, accept, maxSize }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (maxSize && file.size > maxSize) {
      toast({
        title: 'File too large',
        description: `Maximum file size is ${formatFileSize(maxSize)}`,
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      await onUpload(file);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  }, [maxSize, onUpload, toast]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            {maxSize && (
              <p className="text-xs text-muted-foreground">
                Max file size: {formatFileSize(maxSize)}
              </p>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            disabled={isUploading}
          />
        </label>
      </div>
      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-center text-muted-foreground">
            Uploading... {progress}%
          </p>
        </div>
      )}
    </div>
  );
}