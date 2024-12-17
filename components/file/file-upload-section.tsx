'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { UploadZone } from './upload-zone';
import { UploadStatus } from './upload-status';

export function FileUploadSection() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleUploadComplete = (fileUrl: string) => {
    setUploadedFiles(prev => [...prev, fileUrl]);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Upload Documents</h2>
          <p className="text-sm text-muted-foreground">
            Upload your documentation files for AI-powered analysis and insights.
          </p>
        </div>

        <UploadZone onUploadComplete={handleUploadComplete} />
        
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Processing Files</h3>
            <UploadStatus />
          </div>
        )}
      </div>
    </Card>
  );
}