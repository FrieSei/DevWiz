export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl.replace(/^https:/, 'http:');
  }

  async fetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(this.baseUrl + url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(url: string, options: RequestInit = {}) {
    return this.fetch<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: unknown, options: RequestInit = {}) {
    return this.fetch<T>(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const httpClient = new HttpClient(process.env.NEXT_PUBLIC_API_URL);