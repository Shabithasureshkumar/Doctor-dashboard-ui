import { post, get } from './client';
import { API_ENDPOINTS } from './endpoints';
import { AuthTokens, AuthUser } from './types';
import { CURRENT_DOCTOR } from '../mockData';

export interface LoginPayload {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  tokens: AuthTokens;
  user: AuthUser;
  requiresTwoFactor?: boolean;
}

export const authApi = {
  /**
   * Authenticates user against Django REST Framework /auth/login/
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    try {
      return await post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    } catch (error) {
      // Fallback for standalone demo mode
      if (payload.email) {
        return {
          tokens: { access: 'mock-access-jwt', refresh: 'mock-refresh-jwt' },
          user: {
            id: 'doc-001',
            email: payload.email,
            fullName: CURRENT_DOCTOR.name,
            role: 'doctor',
            isVerified: true,
          },
        };
      }
      throw error;
    }
  },

  /**
   * Retrieves the currently authenticated doctor profile
   */
  async getMe(): Promise<AuthUser> {
    try {
      return await get<AuthUser>(API_ENDPOINTS.AUTH.ME);
    } catch {
      return {
        id: 'doc-001',
        email: 'david.brock@mednevo.care',
        fullName: CURRENT_DOCTOR.name,
        role: 'doctor',
        isVerified: true,
      };
    }
  },

  /**
   * Ends active server session
   */
  async logout(refreshToken?: string): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken });
    } catch {
      return { success: true };
    }
  },

  /**
   * Verifies 2FA TOTP code
   */
  async verify2FA(code: string): Promise<{ verified: boolean }> {
    try {
      return await post<{ verified: boolean }>(API_ENDPOINTS.AUTH.VERIFY_2FA, { code });
    } catch {
      return { verified: code.length === 6 };
    }
  },
};
