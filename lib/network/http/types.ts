export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  status: number;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}