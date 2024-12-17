import { api } from '../api/fetch-client';
import { ApiResponse, PaginationParams } from '../types/common';

export abstract class BaseService {
  protected abstract basePath: string;

  protected async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return api.get<T>(`${this.basePath}${endpoint}`, { params });
  }

  protected async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return api.post<T>(`${this.basePath}${endpoint}`, data);
  }

  protected async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return api.put<T>(`${this.basePath}${endpoint}`, data);
  }

  protected async delete<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    return api.delete<T>(`${this.basePath}${endpoint}`, { params });
  }

  protected getPaginationParams(params: PaginationParams): Record<string, string> {
    return {
      page: params.page.toString(),
      limit: params.limit.toString(),
    };
  }
}