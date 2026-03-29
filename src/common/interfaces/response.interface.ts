export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta: ResponseMeta;
}

export interface ResponseMeta {
  statusCode: number;
  timestamp: string;
  path: string;
  requestId: string;
  pagination?: PaginationMeta;
}

export interface PaginationMeta {
  limit: number;
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface PaginationResult<T> {
  items: T[];
  limit: number;
  nextCursor: string | null;
  hasNextPage: boolean;
}

export interface ErrorResponse {
  success: boolean;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown> | string[];
  };
  meta: {
    statusCode: number;
    timestamp: string;
    path: string;
    requestId: string;
  };
}
