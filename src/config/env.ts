/**
 * Centralized, validated environment configuration for Mednevo Doctor Portal.
 */

export interface AppEnvConfig {
  env: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  apiTimeoutMs: number;
  enableMockFallback: boolean;
  isProduction: boolean;
}

export const ENV: AppEnvConfig = {
  env: ((import.meta.env.VITE_APP_ENV as string) || 'development') as AppEnvConfig['env'],
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api/v1',
  apiTimeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 15000,
  enableMockFallback: import.meta.env.VITE_ENABLE_MOCK_FALLBACK !== 'false',
  isProduction: import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production',
};
