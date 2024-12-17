import { API_CONFIG } from '@/lib/config/constants';
import { ApiResponse, RequestConfig } from './types';

export class HttpClient {
  constructor(private baseUrl: string = API_CONFIG.baseUrl) {
    // Ensure we're using http:// protocol
    this.baseUrl = this.baseUrl.replace(/^https:/, 'http:');
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { params, timeout = API_CONFIG.timeout, ...init } = config;
    
    const url = new URL(endpoint, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), {
        ...init,
        signal: controller.signal,
        headers: {
          ...API_CONFIG.headers,
          ...init.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig) {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const httpClient = new HttpClient();