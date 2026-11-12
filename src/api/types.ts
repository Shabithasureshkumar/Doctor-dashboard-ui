/**
 * Standard Django REST Framework (DRF) Type Definitions.
 */

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  status?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  detail?: string;
  code?: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: 'doctor' | 'admin' | 'nurse';
  isVerified: boolean;
  twoFactorRequired?: boolean;
}
