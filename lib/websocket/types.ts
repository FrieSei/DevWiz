export type FileStatus = 'processing' | 'completed' | 'failed';

export interface FileProcessingEvent {
  type: 'file_status';
  data: {
    fileId: string;
    status: FileStatus;
    progress?: number;
    error?: string;
    metadata?: Record<string, any>;
  };
}

export type WebSocketMessage = FileProcessingEvent;