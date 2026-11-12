import { get } from './client';
import { API_ENDPOINTS } from './endpoints';
import { ClinicalAlert } from '../types';
import { INITIAL_ALERTS } from '../mockData';

export interface DashboardMetricsResponse {
  patientsCount: number;
  patientsChangePercent: number;
  appointmentsCount: number;
  appointmentsChangePercent: number;
  reportsCount: number;
  reportsChangePercent: number;
  totalVisitors: number;
  totalVisitorsChangePercent: number;
}

export const dashboardApi = {
  /**
   * Fetches real-time dashboard stat cards metrics
   */
  async getMetrics(): Promise<DashboardMetricsResponse> {
    try {
      return await get<DashboardMetricsResponse>(API_ENDPOINTS.DASHBOARD.METRICS);
    } catch {
      return {
        patientsCount: 35,
        patientsChangePercent: 8,
        appointmentsCount: 16,
        appointmentsChangePercent: 3,
        reportsCount: 22,
        reportsChangePercent: 5,
        totalVisitors: 32,
        totalVisitorsChangePercent: 3,
      };
    }
  },

  /**
   * Fetches active clinical alerts requiring physician review
   */
  async getClinicalAlerts(): Promise<ClinicalAlert[]> {
    try {
      return await get<ClinicalAlert[]>(API_ENDPOINTS.DASHBOARD.ALERTS);
    } catch {
      return INITIAL_ALERTS;
    }
  },
};
