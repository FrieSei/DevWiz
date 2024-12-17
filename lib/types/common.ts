export type ErrorWithMessage = {
  message: string;
  code?: string;
  status?: number;
};

export type ApiResponse<T> = {
  data?: T;
  error?: ErrorWithMessage;
};

export type PaginationParams = {
  page: number;
  limit: number;
};

export type SortParams = {
  field: string;
  direction: 'asc' | 'desc';
};