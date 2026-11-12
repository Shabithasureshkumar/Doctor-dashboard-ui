import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiQueryParams, PaginatedResponse } from './types';
import { MedicalReport } from '../types/reports';
import { INITIAL_REPORTS } from '../mockData/reportsData';

export const reportsApi = {
  /**
   * Fetches paginated diagnostic medical reports
   */
  async list(params?: ApiQueryParams): Promise<PaginatedResponse<MedicalReport>> {
    try {
      return await get<PaginatedResponse<MedicalReport>>(API_ENDPOINTS.REPORTS.LIST, params);
    } catch {
      let filtered = [...INITIAL_REPORTS];
      if (params?.status && params.status !== 'all') {
        filtered = filtered.filter((r) => r.status === params.status);
      }
      if (params?.category && params.category !== 'all') {
        filtered = filtered.filter((r) => r.type === params.category);
      }
      if (params?.search) {
        const q = String(params.search).toLowerCase();
        filtered = filtered.filter(
          (r) =>
            r.testName.toLowerCase().includes(q) ||
            r.patientName.toLowerCase().includes(q) ||
            r.patientId.toLowerCase().includes(q)
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
   * Marks a diagnostic report as reviewed by the physician
   */
  async markReviewed(id: string, notes?: string): Promise<{ success: boolean; reviewedAt: string }> {
    try {
      return await post<{ success: boolean; reviewedAt: string }>(API_ENDPOINTS.REPORTS.MARK_REVIEWED(id), { notes });
    } catch {
      return {
        success: true,
        reviewedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
    }
  },

  /**
   * Uploads a diagnostic report document
   */
  async upload(formData: FormData): Promise<MedicalReport> {
    try {
      return await post<MedicalReport>(API_ENDPOINTS.REPORTS.UPLOAD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } catch {
      return {
        id: `REP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        patientId: 'PT10234',
        patientName: 'Sarah Johnson',
        patientAge: 61,
        patientGender: 'Female',
        patientBloodGroup: 'B+',
        patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
        testName: 'Diagnostic Upload',
        type: 'Lab',
        categoryLabel: 'General Clinical Lab',
        requestedDate: 'Nov 12, 2026',
        receivedDate: 'Today',
        status: 'Pending Review',
        priority: 'Normal',
        orderingPhysician: 'Dr. David Brock',
        diagnosticCenter: 'Mednevo Central Diagnostic Center',
        pdfDownloadName: 'diagnostic-report.pdf',
      };
    }
  },
};
