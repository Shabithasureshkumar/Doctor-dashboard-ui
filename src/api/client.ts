import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { ENV } from '../config/env';
import { ApiErrorResponse, AuthTokens } from './types';

export const TOKEN_STORAGE_KEY = 'mednevo_auth_tokens';

// In-flight request deduplication map
const pendingRequests = new Map<string, AbortController>();

function generateRequestKey(config: AxiosRequestConfig): string {
  return `${config.method?.toUpperCase() || 'GET'}:${config.url}:${JSON.stringify(config.params || {})}:${JSON.stringify(config.data || {})}`;
}

/**
 * Reads stored JWT tokens from localStorage
 */
export function getStoredTokens(): AuthTokens | null {
  try {
    const raw = localStorage.getItem(TOKEN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Stores JWT tokens securely in localStorage
 */
export function setStoredTokens(tokens: AuthTokens | null) {
  try {
    if (tokens) {
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Failed to update auth tokens:', err);
  }
}

/**
 * Global Session Expiration Listener Callbacks
 */
type SessionExpiredHandler = () => void;
const sessionExpiredHandlers = new Set<SessionExpiredHandler>();

export function onSessionExpired(handler: SessionExpiredHandler): () => void {
  sessionExpiredHandlers.add(handler);
  return () => sessionExpiredHandlers.delete(handler);
}

function notifySessionExpired() {
  setStoredTokens(null);
  sessionExpiredHandlers.forEach((h) => {
    try {
      h();
    } catch (e) {
      console.error('Session expiration handler failed:', e);
    }
  });
}

/**
 * Helper to get Cookie value by name (for Django CSRF)
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Create Centralized Axios HTTP Client Instance
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: ENV.apiBaseUrl,
  timeout: ENV.apiTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// REQUEST INTERCEPTOR: Auth, CSRF, Deduplication
// ─────────────────────────────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Inject JWT Access Token
    const tokens = getStoredTokens();
    if (tokens?.access && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }

    // 2. Inject Django CSRF Token if present
    const csrfToken = getCookie('csrftoken');
    if (csrfToken && !config.headers['X-CSRFToken']) {
      config.headers['X-CSRFToken'] = csrfToken;
    }

    // 3. Request Deduplication (for idempotent GET requests)
    if (config.method?.toUpperCase() === 'GET') {
      const requestKey = generateRequestKey(config);
      if (pendingRequests.has(requestKey)) {
        // Cancel prior duplicate in-flight request
        pendingRequests.get(requestKey)?.abort();
      }
      const controller = new AbortController();
      config.signal = controller.signal;
      pendingRequests.set(requestKey, controller);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// RESPONSE INTERCEPTOR: Auth Expiry, Error Normalization, In-Flight Cleanup
// ─────────────────────────────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Clean up in-flight deduplication entry
    if (response.config.method?.toUpperCase() === 'GET') {
      const key = generateRequestKey(response.config);
      pendingRequests.delete(key);
    }
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (originalRequest?.method?.toUpperCase() === 'GET') {
      const key = generateRequestKey(originalRequest);
      pendingRequests.delete(key);
    }

    // Handle 401 Unauthorized (Expired or Invalid JWT)
    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const tokens = getStoredTokens();

        if (tokens?.refresh) {
          try {
            // Attempt to refresh the access token via DRF SimpleJWT refresh endpoint
            const refreshRes = await axios.post<{ access: string }>(
              `${ENV.apiBaseUrl}/auth/token/refresh/`,
              { refresh: tokens.refresh }
            );

            if (refreshRes.data.access) {
              setStoredTokens({
                access: refreshRes.data.access,
                refresh: tokens.refresh,
              });

              originalRequest.headers.Authorization = `Bearer ${refreshRes.data.access}`;
              return apiClient(originalRequest);
            }
          } catch (refreshErr) {
            // Token refresh failed - session expired
            notifySessionExpired();
            return Promise.reject(refreshErr);
          }
        } else {
          notifySessionExpired();
        }
      } else {
        notifySessionExpired();
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('[API Security] 403 Forbidden: Insufficient clinical permissions.');
    }

    // Normalize Error Messages
    const normalizedError: ApiErrorResponse = {
      status: error.response?.status,
      detail:
        error.response?.data?.detail ||
        error.response?.data?.code ||
        (error.message === 'Network Error'
          ? 'Network failure: Unable to reach the Mednevo server. Please verify your connection.'
          : error.message || 'An unexpected error occurred during API request.'),
      errors: error.response?.data?.errors,
    };

    return Promise.reject(normalizedError);
  }
);

/**
 * Type-safe HTTP convenience wrappers
 */
export async function get<T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, { ...config, params });
  return response.data;
}

export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.patch<T>(url, data, config);
  return response.data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}
