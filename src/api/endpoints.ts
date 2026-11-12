/**
 * Centralized API Endpoint Registry for Mednevo Doctor Portal.
 * Follows Django REST Framework (DRF) idiomatic routing standards.
 */

export const API_ENDPOINTS = {
  // Authentication & Session
  AUTH: {
    LOGIN: '/auth/login/',
    LOGOUT: '/auth/logout/',
    REFRESH: '/auth/token/refresh/',
    ME: '/auth/users/me/',
    CHANGE_PASSWORD: '/auth/password/change/',
    VERIFY_2FA: '/auth/2fa/verify/',
  },

  // Dashboard & Real-Time Telemetry
  DASHBOARD: {
    METRICS: '/dashboard/metrics/',
    CHARTS: '/dashboard/charts/',
    ALERTS: '/dashboard/clinical-alerts/',
    QUEUE: '/dashboard/patient-queue/',
    SCHEDULE: '/dashboard/today-schedule/',
  },

  // Appointments Management
  APPOINTMENTS: {
    LIST: '/appointments/',
    DETAIL: (id: string | number) => `/appointments/${id}/`,
    CREATE: '/appointments/',
    RESCHEDULE: (id: string | number) => `/appointments/${id}/reschedule/`,
    CANCEL: (id: string | number) => `/appointments/${id}/cancel/`,
    STATS: '/appointments/stats/',
    TIMELINE: '/appointments/timeline/',
  },

  // Patients Directory & Electronic Health Record (EHR)
  PATIENTS: {
    LIST: '/patients/',
    DETAIL: (id: string | number) => `/patients/${id}/`,
    SUMMARY: (id: string | number) => `/patients/${id}/ai-summary/`,
    VITALS: (id: string | number) => `/patients/${id}/vitals/`,
    LABS: (id: string | number) => `/patients/${id}/labs/`,
    MEDICATIONS: (id: string | number) => `/patients/${id}/medications/`,
    VISITS: (id: string | number) => `/patients/${id}/visits/`,
    CARE_PLANS: (id: string | number) => `/patients/${id}/care-plans/`,
    SOAP_NOTES: (id: string | number) => `/patients/${id}/soap-notes/`,
  },

  // Asynchronous Clinical Chat & Telehealth Messages
  CHAT: {
    CONVERSATIONS: '/chat/conversations/',
    MESSAGES: (convId: string | number) => `/chat/conversations/${convId}/messages/`,
    SEND: '/chat/messages/send/',
    ATTACHMENTS: '/chat/attachments/upload/',
    MARK_READ: (convId: string | number) => `/chat/conversations/${convId}/read/`,
  },

  // Diagnostic Clearinghouse & Reports
  REPORTS: {
    LIST: '/reports/',
    DETAIL: (id: string | number) => `/reports/${id}/`,
    UPLOAD: '/reports/upload/',
    EXPORT: (id: string | number) => `/reports/${id}/export/`,
    ANALYTICS: '/reports/analytics/',
    MARK_REVIEWED: (id: string | number) => `/reports/${id}/review/`,
  },

  // Revenue Cycle, Claims & Billing
  BILLING: {
    KPIS: '/billing/kpis/',
    INVOICES: '/billing/invoices/',
    CLAIMS: '/billing/claims/',
    PAYMENTS: '/billing/payments/',
    PAYOUTS: '/billing/payouts/',
    REQUEST_PAYOUT: '/billing/payouts/request/',
    SERVICES: '/billing/fee-schedule/',
  },

  // Provider Settings & Access
  SETTINGS: {
    STATE: '/doctor/settings/',
    PROFILE: '/doctor/profile/',
    AVAILABILITY: '/doctor/availability/',
    PREFERENCES: '/doctor/preferences/',
    SECURITY: '/doctor/security/',
    INTEGRATIONS: '/doctor/integrations/',
  },
} as const;
