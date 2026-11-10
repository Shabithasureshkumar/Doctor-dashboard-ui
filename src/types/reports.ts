export type ReportType = 'Lab' | 'Imaging' | 'Diagnostic' | 'Clinical';

export type ReportPriority = 'Normal' | 'High' | 'Urgent';

export type ReportStatus = 'Pending Review' | 'Reviewed' | 'Abnormal' | 'Critical';

export type InterpretationType = 'Normal' | 'High' | 'Low' | 'Abnormal' | 'Critical';

export interface TestResultItem {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  interpretation: InterpretationType;
  clinicalSignificance?: string;
}

export interface LabReportDetails {
  specimenType: string;
  collectionDate: string;
  reportingDate: string;
  methodology?: string;
  testItems: TestResultItem[];
}

export interface ImagingReportDetails {
  imagingType: 'X-Ray' | 'MRI' | 'CT Scan' | 'Ultrasound' | 'Mammogram';
  bodyRegion: string;
  technique: string;
  clinicalHistory: string;
  radiologistFindings: string[];
  impression: string;
  radiologistName: string;
  radiologistCredentials: string;
  imageUrl?: string;
}

export interface DiagnosticReportDetails {
  diagnosticType: 'ECG' | 'Holter' | 'Echocardiogram' | 'Spirometry' | 'EEG';
  clinicalIndication: string;
  technicianNotes?: string;
  findings: string[];
  interpretation: string;
  cardiologistName?: string;
  tracingUrl?: string;
}

export interface MedicalReport {
  id: string; // e.g. "REP-2026-0941"
  patientId: string; // e.g. "PT10256"
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientBloodGroup: string;
  patientAvatar: string;
  type: ReportType;
  testName: string;
  categoryLabel: string;
  requestedDate: string;
  receivedDate: string;
  priority: ReportPriority;
  status: ReportStatus;
  orderingPhysician: string;
  diagnosticCenter: string;
  labDetails?: LabReportDetails;
  imagingDetails?: ImagingReportDetails;
  diagnosticDetails?: DiagnosticReportDetails;
  doctorNotes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  sharedWithPatient?: boolean;
  sharedAt?: string;
  pdfDownloadName?: string;
}

export type ReportsFilterTab = 'all' | 'lab' | 'imaging' | 'diagnostic' | 'clinical';

export interface ReportsFilterOptions {
  searchQuery: string;
  type: 'all' | ReportType;
  status: 'all' | ReportStatus;
  priority: 'all' | ReportPriority;
  dateRange: 'all' | 'today' | '7days' | '30days' | '3months';
  orderingPhysician: string;
}
