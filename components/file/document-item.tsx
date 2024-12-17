import { FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/utils/file';
import { formatRelativeTime } from '@/lib/utils/date';
import { Document } from '@/lib/services/document-service';

interface DocumentItemProps {
  document: Document;
  onDelete: (fileName: string) => void;
}

export function DocumentItem({ document, onDelete }: DocumentItemProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="font-medium">{document.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatFileSize(document.contentLength)} • {formatRelativeTime(new Date(document.lastModified))}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(document.name)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}