export type MessageSender = 'doctor' | 'patient' | 'system';
export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered' | 'read';
export type MessageAttachmentType = 'pdf' | 'image' | 'prescription' | 'lab_report';

export interface ChatAttachment {
  id: string;
  type: MessageAttachmentType;
  fileName: string;
  fileSize: string;
  fileUrl?: string;
  previewUrl?: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  content: string;
  timestamp: string;
  status: MessageDeliveryStatus;
  type?: 'text' | 'attachment' | 'prescription' | 'lab_report' | 'system';
  attachments?: ChatAttachment[];
  clinicalTag?: string;
}

export interface PatientBriefContext {
  patientId: string;
  name: string;
  avatarUrl: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  bloodGroup: string;
  phone: string;
  email: string;
  allergies: string[];
  conditions: string[];
  currentMedications: string[];
  medicalAlerts: string[];
  lastAppointment: string;
  lastConsultation: string;
  recentLabReports: string[];
  recentPrescriptions: string[];
}

export interface ChatConversation {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  online: boolean;
  lastActive: string;
  isPinned: boolean;
  isArchived: boolean;
  unreadCount: number;
  lastMessage: {
    text: string;
    timestamp: string;
    sender: MessageSender;
    type: 'text' | 'image' | 'document' | 'prescription' | 'lab';
  };
  patientContext: PatientBriefContext;
  messages: ChatMessage[];
}

export type ChatFilterTab = 'all' | 'unread' | 'patients' | 'archived';
