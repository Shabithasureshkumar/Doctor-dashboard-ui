import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { DoctorSettingsState } from '../types/settings';
import { INITIAL_SETTINGS_STATE } from '../mockData/settingsData';

export const settingsApi = {
  /**
   * Retrieves physician portal settings
   */
  async getSettings(): Promise<DoctorSettingsState> {
    try {
      return await get<DoctorSettingsState>(API_ENDPOINTS.SETTINGS.STATE);
    } catch {
      try {
        const local = localStorage.getItem('mednevo_doctor_settings_v1');
        if (local) return JSON.parse(local);
      } catch {
        // fallback
      }
      return INITIAL_SETTINGS_STATE;
    }
  },

  /**
   * Persists updated settings to backend
   */
  async saveSettings(settings: DoctorSettingsState): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.SETTINGS.STATE, settings);
    } catch {
      try {
        localStorage.setItem('mednevo_doctor_settings_v1', JSON.stringify(settings));
      } catch {
        // fallback
      }
      return { success: true };
    }
  },
};
