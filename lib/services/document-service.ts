import { api } from '@/lib/api/fetch-client';
import { PaginationParams, SortParams } from '@/lib/types/common';

export interface Document {
  id: string;
  name: string;
  url: string;
  contentLength: number;
  lastModified: string;
}

interface GetDocumentsParams extends PaginationParams {
  sort?: SortParams;
  search?: string;
}

export class DocumentService {
  static async getDocuments(params: GetDocumentsParams) {
    return api.get<Document[]>('/api/files', { params: params as Record<string, string> });
  }

  static async deleteDocument(fileName: string) {
    return api.delete(`/api/files`, { params: { fileName } });
  }

  static async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return api.post<{ url: string }>('/api/upload', formData, {
      headers: {
        // Don't set Content-Type here, let the browser set it with the boundary
      },
    });
  }
}