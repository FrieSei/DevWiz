'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatFileSize } from '@/lib/utils/file';
import { formatRelativeTime } from '@/lib/utils/date';
import { useToast } from '@/hooks/use-toast';

interface Document {
  name: string;
  url: string;
  contentLength: number;
  lastModified: string;
}

export function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/files');
      if (!response.ok) throw new Error('Failed to fetch documents');
      const { files } = await response.json();
      setDocuments(files);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load documents',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (fileName: string) => {
    try {
      const response = await fetch(`/api/files?fileName=${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete document');
      
      setDocuments(prev => prev.filter(doc => doc.name !== fileName));
      
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete document',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-32">
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      </Card>
    );
  }

  if (documents.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex flex-col items-center justify-center h-32 space-y-2">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No documents uploaded yet</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Your Documents</h2>
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(doc.contentLength)} • {formatRelativeTime(new Date(doc.lastModified))}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(doc.name)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}