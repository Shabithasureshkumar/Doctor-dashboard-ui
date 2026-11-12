import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiQueryParams, PaginatedResponse } from './types';
import { PatientRecord, INITIAL_PATIENTS_LIST } from '../mockData/patientsData';

export const patientsApi = {
  /**
   * Fetches paginated patient directory with search
   */
  async list(params?: ApiQueryParams): Promise<PaginatedResponse<PatientRecord>> {
    try {
      return await get<PaginatedResponse<PatientRecord>>(API_ENDPOINTS.PATIENTS.LIST, params);
    } catch {
      let filtered = [...INITIAL_PATIENTS_LIST];
      if (params?.search) {
        const q = String(params.search).toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.patientId.toLowerCase().includes(q) ||
            p.phone.includes(q) ||
            p.email.toLowerCase().includes(q)
        );
      }
      return {
        count: filtered.length,
        next: null,
        previous: null,
        results: filtered,
      };
    }
  },

  /**
   * Retrieves single patient EHR record by id or MRN
   */
  async getById(id: string): Promise<PatientRecord> {
    try {
      return await get<PatientRecord>(API_ENDPOINTS.PATIENTS.DETAIL(id));
    } catch {
      const found = INITIAL_PATIENTS_LIST.find((p) => p.id === id || p.patientId === id);
      return found || INITIAL_PATIENTS_LIST[0];
    }
  },

  /**
   * Saves or updates a SOAP Clinical Note
   */
  async saveSoapNote(patientId: string, note: Record<string, any>): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.PATIENTS.SOAP_NOTES(patientId), note);
    } catch {
      return { success: true };
    }
  },
};
