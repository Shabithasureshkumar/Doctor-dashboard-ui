export type TabType = 'Dashboard' | 'Appointment' | 'Patient' | 'Reports' | 'Chats' | 'Billing';

export type CalendarViewType = 'Day' | 'Week' | 'Month' | 'Agenda';

export type AppointmentType =
  | 'Video Visit'
  | 'In-person'
  | 'Follow-up'
  | 'Procedure'
  | 'New Patient';

export type ProviderStatusType = 'Available' | 'In Consultation' | 'Running Late' | 'Offline';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  mrn: string;
  avatarUrl: string;
  condition: string;
  waitTime?: string;
  visitType?: AppointmentType;
  status?: 'Waiting' | 'In Consultation' | 'Completed' | 'Upcoming';
  queueStatus?: 'Ready' | 'Processing' | 'Urgent';
  vitals?: {
    bpAvg: string;
    ldl: number;
    ldlStatus: 'Improving' | 'Stable' | 'Elevated';
    adherence: number;
  };
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  avatarUrl?: string;
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  dateNumber: number;
  time: string;
  startTime: string; // e.g. "08:00"
  durationMinutes: number;
  type: AppointmentType;
  status: 'Completed' | 'Resume' | 'Join' | 'Upcoming' | 'Processing';
  hasSummaryBadge?: boolean;
  colorTag: 'purple' | 'amber' | 'blue' | 'rose' | 'emerald' | 'indigo' | 'pink' | 'slate' | 'teal';
  avatarInitials: string;
}

export interface ClinicalAlert {
  id: string;
  patientName: string;
  category: string;
  description: string;
  type: 'danger' | 'warning' | 'caution' | 'info';
  timestamp: string;
  isDismissed?: boolean;
}

export interface ScheduleEvent {
  id: string;
  time: string;
  patientName: string;
  type: 'Follow-up' | 'Procedure' | 'Video Visit' | 'New Patient';
  status: 'Completed' | 'Resume' | 'Join';
  hasSummary?: boolean;
  isProcessing?: boolean;
}

export interface MessageItem {
  id: string;
  senderName: string;
  role: 'PATIENT' | 'STAFF' | 'CARDIO';
  content: string;
  timeAgo: string;
  isUnread: boolean;
  avatarUrl: string;
}

export interface PrescriptionItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  quantity: string;
  status: '2 Left' | '1 Left' | 'Needed';
  statusColor: 'green' | 'amber' | 'red';
}
