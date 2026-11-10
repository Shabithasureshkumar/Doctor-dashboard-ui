export type SettingsSectionId =
  | 'profile'
  | 'availability'
  | 'consultation'
  | 'notifications'
  | 'clinical'
  | 'security'
  | 'integrations'
  | 'appearance'
  | 'help';

export interface DoctorProfile {
  avatarUrl: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  registrationNumber: string;
  qualification: string;
  specialization: string;
  yearsOfExperience: number;
  clinicName: string;
  languages: string[];
  bio: string;
}

export interface WorkingDaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakStart: string;
  breakEnd: string;
}

export interface LeaveRecord {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  type: 'Vacation' | 'Medical' | 'Conference' | 'Personal';
  status: 'Approved' | 'Pending';
}

export interface HolidayRecord {
  id: string;
  name: string;
  date: string;
  enabled: boolean;
}

export interface AvailabilitySchedule {
  workingDays: WorkingDaySchedule[];
  consultationDuration: 15 | 30 | 45 | 60;
  bufferTime: 0 | 5 | 10 | 15;
  timeZone: string;
  leaves: LeaveRecord[];
  holidays: HolidayRecord[];
}

export interface ConsultationPreferences {
  defaultConsultationType: 'In-person' | 'Video Consultation';
  autoConfirmAppointments: boolean;
  allowPatientRescheduling: boolean;
  rescheduleCutoffHours: number;
  allowPatientCancellation: boolean;
  cancellationCutoffHours: number;
  followUpDuration: 15 | 20 | 30;
  waitingRoomEnabled: boolean;
  waitingRoomIntakeRequired: boolean;
  autoAdmitPatient: boolean;
  preferredLanguage: string;
}

export interface ChannelSettings {
  email: boolean;
  sms: boolean;
  push: boolean;
  inApp: boolean;
}

export interface NotificationPreferences {
  appointments: {
    newAppointment: ChannelSettings;
    confirmation: ChannelSettings;
    reminder: ChannelSettings;
    cancellation: ChannelSettings;
    rescheduled: ChannelSettings;
  };
  patients: {
    newRegistration: ChannelSettings;
    messages: ChannelSettings;
    followUpDue: ChannelSettings;
  };
  clinical: {
    labUpdates: ChannelSettings;
    clinicalAlerts: ChannelSettings;
    prescriptionUpdates: ChannelSettings;
  };
  other: {
    payments: ChannelSettings;
    systemUpdates: ChannelSettings;
  };
}

export interface DiagnosisTag {
  code: string;
  name: string;
}

export interface ProcedureTag {
  code: string;
  name: string;
}

export interface ClinicalPreferences {
  defaultSoapTemplate: 'Standard Comprehensive' | 'Focused Follow-up' | 'Cardiology Telemetry' | 'Pediatric';
  autoCapitalizeDiagnoses: boolean;
  includeIcd10Codes: boolean;
  autoLinkPrescriptions: boolean;
  defaultRefillDurationDays: number;
  autoCheckDrugInteractions: boolean;
  genericSubstitutionAllowed: boolean;
  frequentlyUsedDiagnoses: DiagnosisTag[];
  frequentlyUsedProcedures: ProcedureTag[];
  preferredUnits: {
    bloodPressure: 'mmHg';
    temperature: '°F' | '°C';
    weight: 'kg' | 'lbs';
    glucose: 'mg/dL' | 'mmol/L';
  };
  signatureUrl: string;
  signatureType: 'drawn' | 'uploaded' | 'verified_stamp';
  preferredTerminology: 'SNOMED CT' | 'ICD-10-CM' | 'RxNorm';
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  isCurrent: boolean;
  lastActive: string;
}

export interface LoginAuditItem {
  id: string;
  timestamp: string;
  device: string;
  location: string;
  ip: string;
  status: 'Success' | 'Failed';
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorMethod: 'authenticator' | 'sms';
  securityScore: number;
  lastPasswordChange: string;
  activeSessions: ActiveSession[];
  loginHistory: LoginAuditItem[];
  privacy: {
    allowClinicalAnalytics: boolean;
    patientDataMaskingOnScreenShare: boolean;
    sessionAutoLockMinutes: number;
  };
}

export interface IntegrationItem {
  id: string;
  name: string;
  category: 'Telehealth' | 'E-Prescription' | 'EHR / EMR' | 'Calendar' | 'Laboratory' | 'Payments';
  description: string;
  status: 'Connected' | 'Ready to Connect' | 'Requires Configuration';
  lastSync: string;
  iconName: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: 'purple' | 'cyan' | 'indigo' | 'emerald';
  fontSize: 'small' | 'standard' | 'large';
  layoutDensity: 'comfortable' | 'compact';
  highContrast: boolean;
  reducedMotion: boolean;
  screenReaderOptimized: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Scheduling' | 'Clinical' | 'Billing' | 'Security';
}

export interface DoctorSettingsState {
  profile: DoctorProfile;
  availability: AvailabilitySchedule;
  consultation: ConsultationPreferences;
  notifications: NotificationPreferences;
  clinical: ClinicalPreferences;
  security: SecuritySettings;
  integrations: IntegrationItem[];
  appearance: AppearanceSettings;
}
