import { get, post } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ApiQueryParams, PaginatedResponse } from './types';
import {
  DetailedAppointment,
  INITIAL_DETAILED_APPOINTMENTS,
  AppointmentCategory,
} from '../mockData/appointmentListData';

export interface CreateAppointmentPayload {
  patientName: string;
  patientId?: string;
  reason: string;
  date: string;
  time: string;
  duration: string;
  mode: 'Video Call' | 'In-Person';
  category: AppointmentCategory;
}

export const appointmentsApi = {
  /**
   * Retrieves list of appointments with pagination, category filter, and search
   */
  async list(params?: ApiQueryParams): Promise<PaginatedResponse<DetailedAppointment>> {
    try {
      return await get<PaginatedResponse<DetailedAppointment>>(API_ENDPOINTS.APPOINTMENTS.LIST, params);
    } catch {
      let filtered = [...INITIAL_DETAILED_APPOINTMENTS];
      if (params?.category && params.category !== 'all') {
        filtered = filtered.filter((a) => a.category === params.category);
      }
      if (params?.search) {
        const q = String(params.search).toLowerCase();
        filtered = filtered.filter(
          (a) =>
            a.patientName.toLowerCase().includes(q) ||
            a.patientId.toLowerCase().includes(q) ||
            a.reason.toLowerCase().includes(q)
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
   * Schedules a new appointment
   */
  async create(payload: CreateAppointmentPayload): Promise<DetailedAppointment> {
    try {
      return await post<DetailedAppointment>(API_ENDPOINTS.APPOINTMENTS.CREATE, payload);
    } catch {
      return {
        id: `apt-${Date.now()}`,
        time: payload.time,
        duration: payload.duration,
        patientName: payload.patientName,
        patientId: payload.patientId || `PT-${Math.floor(10000 + Math.random() * 90000)}`,
        patientAge: 38,
        patientGender: 'Female',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        reason: payload.reason,
        category: payload.category || 'upcoming',
        mode: payload.mode,
        countdown: 'Scheduled',
        countdownSeconds: 1800,
        iconType: 'heart',
      };
    }
  },

  /**
   * Reschedules an existing appointment
   */
  async reschedule(id: string, newDate: string, newTime: string, reason?: string): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.APPOINTMENTS.RESCHEDULE(id), {
        date: newDate,
        time: newTime,
        reason,
      });
    } catch {
      return { success: true };
    }
  },

  /**
   * Cancels an appointment
   */
  async cancel(id: string, reason?: string): Promise<{ success: boolean }> {
    try {
      return await post<{ success: boolean }>(API_ENDPOINTS.APPOINTMENTS.CANCEL(id), { reason });
    } catch {
      return { success: true };
    }
  },
};
